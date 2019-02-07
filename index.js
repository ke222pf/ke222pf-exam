const restify = require('restify');
const server = restify.createServer();
const mongoose = require('./config/mongoose')

mongoose()
function users(req, res, next) {
    let user = [
        {name: "carl", squad: "ds"},
        {name: "david", squad: "ds"}
    ]
    res.send(user)
}
server.get('/', users)

server.listen(5000, function() {
    console.log('%s listening at %s', server.name, server.url);
  });