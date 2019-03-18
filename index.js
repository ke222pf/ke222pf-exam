const restify = require("restify")
const mongoose = require("./config/mongoose")
const passport = require("passport")
const cookieSession = require("cookie-session")
var cookieParser = require("cookie-parser")
require("dotenv").config()
const PORT = process.env.PORT || 5000
require("./config/passport")

mongoose()

const server = restify.createServer({
  socketio: true
})

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

server.use(cookieParser())
let io = require("socket.io")(server, {
  pingTimeout: 60000
})

server.use(function(req, res, next) {
  req.io = io
  next()
})


require("./routes/routes")(server)
require("./utils/connectSocket")(io)

server.get("/css|js|img/", restify.plugins.serveStatic({
  directory: "./public"
}))
server.get('/*', restify.plugins.serveStatic({
  directory: './client/build',
  appendRequestPath: false
}))

server.listen(PORT, err => {
  console.log("%s listening at %s", server.name, server.url)
})
