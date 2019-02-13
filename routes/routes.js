require('dotenv').config()
const passport = require('passport')



module.exports = server => {

    
    server.get('/github.com/login/oauth/authorize',
    passport.authenticate('github', {
        scope: ['repo']
    }))
    
    server.get('/api/current_user', (req, res, next) => {
        console.log(req.user)
        res.send(req.user)
        next
      })

    server.get('/login/callback',
    passport.authenticate('github'),
    (req, res, next) => {
        // rendera klient sida
        // console.log(req.user)
            res.redirect('http://localhost:3000/login', next)
    })

    server.get('/api/logout', function(req, res, next) {
        console.log('user wants to logout!')
        console.log(req.user)
        req.logout()
        res.redirect('http://localhost:3000/', next)
    })
}   