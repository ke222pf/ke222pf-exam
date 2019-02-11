require('dotenv').config()
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;


module.exports = server => {

    passport.serializeUser((user, cb) => {
        // console.log(profile.id)
        cb(null, user.id)
    })
    
    passport.deserializeUser((user, done) => {
        done(null, user)
    })
    passport.use(new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/login/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        // sätta upp id till mongoDB
        return done(null, profile)
    }
    ))
    
    server.get('/github.com/login/oauth/authorize',
    passport.authenticate('github', {
        scope: ['repo']
    }))
    
    server.get('/login/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res, next) {
        // rendera klient sida
        res.redirect('http://localhost:3000/login', next)
    })
    server.get('/logout', function(req, res, next) {
        console.log('user wants to logout!')
        console.log(req.user)
        req.logout()
        res.redirect('http://localhost:3000/', next)
    })
}   