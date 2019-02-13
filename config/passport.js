const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user')
const passport = require('passport')

passport.serializeUser((user, done) => {
    console.log(user.id, 'from serialize')
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log(id, 'from mongoDB')
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/login/callback'
},
(accessToken, refreshToken, profile, done) =>{
    // titta så att användaren inte skapar en kopia till databasen.
    User.findOne({githubId: profile.id}).then((currentUser) => {
        if(currentUser) {
            // user already existing in mongoDB.
            return done(null, currentUser)

        } else {
        new User({
            githubId: profile.id
        }).save().then((newUser) => {
            console.log('created user' + newUser)
            return done(null, newUser)
        })
        }
    })
}
))