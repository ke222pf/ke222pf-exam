require('dotenv').config()
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;
const fetch = require('node-fetch')
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
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
    }
    ))


    server.get('/github.com/login/oauth/authorize',
    passport.authenticate('github', {
        scope: ['repo']
    }))

    server.get('/login/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res, next) {
        console.log(req.user)
      res.redirect('/login', next)
    })
}   