const restify = require("restify")
const mongoose = require("./config/mongoose")
const passport = require("passport")
const cookieSession = require("cookie-session")
// const settings = require("./utils/notificationSettings")
const settings = require("./models/hookSettings")
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
var csp = require("helmet-csp")

server.use(
  csp({
    defaultSrc: ["'self'", "default.com"],
    scriptSrc: ["'self'", 'code.jquery.com'],
    styleSrc: ["style.com"],
    imgSrc: ["'self'"],
    connectSrc: ["'self'", "wss//"],
    fontSrc: ["font.com"],
    objectSrc: ["object.com"],
    mediaSrc: ["media.com"],
    frameSrc: ["frame.com"],
    sandbox: ["allow-forms", "allow-scripts"],
    reportUri: "/report-violation",
    reportOnly: false 
  })
)

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

server.listen(PORT, err => {
  console.log("%s listening at %s", server.name, server.url)
})
