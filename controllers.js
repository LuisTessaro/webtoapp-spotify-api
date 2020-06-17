const express = require('express'),
  router = express.Router()

const got = require('got')

const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-image')(),
])

const Link = require('./Link')


router.get('/plsnobully', async (req, res) => {
  res.send(await Link.deleteMany({}))
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const link = await Link.findById(id)
    console.log(link)
    res.redirect(link.link)
  } catch (e) {
    console.log(e)
    res.send('Invalid Link')
  }
})

router.post('/api/smol', async (req, res) => {
  if (!req.body || !req.body.fullLink)
    return res.status(400).send('bad request')
  try {
    const { fullLink } = req.body
    const [originalUrl, type, baseId] = fullLink.match(/https\:\/\/open\.spotify\.com\/(playlist|track|album)\/(.+)/)

    const { body: html, url } = await got(originalUrl)
    const metadata = await metascraper({ html, url })

    const {
      title,
      image
    } = metadata

    const link = new Link({
      link: `spotify://${type}/${baseId}`,
      type,
      url: originalUrl,
      title,
      image,
    })
    
    res.status(201).send(await link.save())
  }
  catch (e) {
    console.log(e)
    res.status(500).send('' + e)
  }
})

router.get('/api/smol', async (req, res) => {
  res.status(200).send(await Link.find({}))
})

router.get('/api/smol', async (req, res) => {
  res.status(200).send(await Link.find({}))
})

router.use('*', (req, res) => {
  res.status(404).send('Resource Not Found')
})

module.exports = router