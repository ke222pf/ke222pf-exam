
var proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use('/endPoint', proxy({ target: 'https://examination1dv612.herokuapp.com/'}))
    app.use('/api/*', proxy({ target: 'https://examination1dv612.herokuapp.com/'}))
}

