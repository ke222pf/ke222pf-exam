require('dotenv').config()
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;
const fetch = require('node-fetch')
module.exports = server => {

    passport.serializeUser((profile, cb) => {
        console.log(profile.id)
        cb(null, profile.id)
    })
    
    passport.deserializeUser((profile, done) => {
        done(null, profile)
    })
    passport.use(new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/login/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
        // console.log(accessToken)
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
      res.redirect('/', next);
    })

    // server.get('/login/callback',
    // passport.authenticate('github'), (req, res, next) => {
    //     console.log(res.accessToken)
    //     res.redirect('http://localhost:5000' + '?access_token' + res.accessToken, next)
    // })
}   