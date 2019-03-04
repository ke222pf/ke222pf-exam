const restify = require("restify")
const mongoose = require("./config/mongoose")
const passport = require("passport")
const cookieSession = require("cookie-session")

require("./config/passport")

mongoose()

const server = restify.createServer()

server.use(restify.plugins.bodyParser({ requestBodyOnGet: true }))
server.use(restify.plugins.queryParser())

server.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["oaisjdpaojsdoajsdpoajsd"]
  })
)

server.use(passport.initialize())
server.use(passport.session())

require("./routes/routes")(server)

server.listen(5000, () => {
  console.log("%s listening at %s", server.name, server.url)
})
