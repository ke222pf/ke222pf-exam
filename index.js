const restify = require('restify');
const server = restify.createServer();
const mongoose = require('./config/mongoose')
const passport = require('passport')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
// const proxy = require('http-proxy-middleware')



mongoose()
server.use(helmet())
server.use(restify.plugins.bodyParser({requestBodyOnGet: true}))
server.use(restify.plugins.queryParser())

server.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: 'oaisjdpaojsdoajsdpoajsd'
}))


server.use(passport.initialize())
require('./routes/routes')(server)
server.use(passport.session())
// server.use('/login', proxy({ target: 'http://localhost:3000/login', changeOrigin: true }))
server.listen(5000, function() {
    console.log('%s listening at %s', server.name, server.url);
  });