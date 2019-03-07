const restify = require("restify")
const mongoose = require("./config/mongoose")
const passport = require("passport")
const cookieSession = require("cookie-session")
// const settings = require("./utils/notificationSettings")
const settings = require("./models/hookSettings")

require("./config/passport")

mongoose()

const server = restify.createServer(({
  socketio:true
}))

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
let io = require('socket.io')(server.server)

require("./utils/notificationSettings")(io)


server.use(function (req, res, next) {
  req.io = io
  next()
})

  server.listen(5000, (err) => {
    console.log("%s listening at %s", server.name, server.url)
  })

