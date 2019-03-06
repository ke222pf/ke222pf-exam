const restify = require("restify")
const mongoose = require("./config/mongoose")
const passport = require("passport")
const cookieSession = require("cookie-session")

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

// server = http.createServer(app)

require("./routes/routes")(server)
let io = require('socket.io')(server.server)

io.on('connection', client => {
  console.log('websocket is connected')
  client.on('boolean',(data) => {
    console.log(data)
  })
})

server.use(function (req, res, next) {
  req.io = io
  next()
})

  server.listen(5000, (err) => {
    console.log("%s listening at %s", server.name, server.url)
  })

