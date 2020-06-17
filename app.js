require('dotenv').config()
const controllers = require('./controllers')

const port = process.env.PORT || process.argv[2] || 3000

const serverConfig = require('./config')
const auth = require('./authMiddleware')

const startServer = async () => {
  const app = await serverConfig()
  app.use(auth)
  app.use(controllers)
  return app.listen(port, () => {
    console.log(`[INFO] Listening on port ${port}!`)
  })
}

startServer()