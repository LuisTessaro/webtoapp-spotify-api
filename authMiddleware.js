module.exports = (req, res, next) => {
  const user = req.headers.user || ``
  const password = req.headers.password || ``

  if (user !== process.env.USER || password !== process.env.PASSWORD) return res.status(401).send('Invalid Credentials')

  next()
}