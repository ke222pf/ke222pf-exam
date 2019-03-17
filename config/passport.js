const GitHubStrategy = require("passport-github").Strategy
const User = require("../models/user")
const passport = require("passport")

passport.serializeUser((user, done) => {
  // console.log(user.id, "from serialize")
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  // console.log(id, "from mongoDB")
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://examination1dv612.herokuapp.com/login/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!accessToken) {
          throw new Error("not allowed")
        }
        // titta så att användaren inte skapar en kopia till databasen.
        await User.findOne({ githubId: profile.id }).then(currentUser => {
          console.log(profile.username)
          
          if (currentUser) {
          

            return done(null, currentUser)
          } else {
            new User({
              githubId: profile.id,
              token: accessToken,
              username: profile.username,
              mail: "NoEmail"
            })
              .save()
              .then(newUser => {
                // console.log("created user" + newUser)
                return done(null, newUser)
              })
          }
        })
        await User.findOneAndUpdate(
          { githubId: profile.id },
          { $set: { token: accessToken } }
        , (err, result) => {
          if(err) {
            console.log(err)
          }
        })
        console.log('körs den?')
      } catch (e) {
        console.log("NOT ALLOWED", e)
      }
    }
  )
)
