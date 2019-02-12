require('dotenv').config()
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user')


module.exports = server => {

    passport.serializeUser((user_id, cb) => {
        // console.log(profile.id)
        cb(null, user_id)
    })
    
    passport.deserializeUser((user_id, done) => {
        done(null, user_id)
    })
    passport.use(new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/login/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        // sätta upp id till mongoDB
        new User({
            githubId: profile.id
        }).save().then((newUser) => {
            console.log('created' + newUser)
        })
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
        console.log(req.user_id)
        req.logout()
        res.redirect('http://localhost:3000/', next)
    })
}   