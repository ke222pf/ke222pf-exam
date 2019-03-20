const GitHubStrategy = require("passport-github").Strategy
const User = require("../models/user")
const passport = require("passport")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/login/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!accessToken) {
          throw new Error("not allowed")
        }
        // titta så att användaren inte skapar en kopia till databasen.
        await User.findOne({ githubId: profile.id }).then(currentUser => {
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
                return done(null, newUser)
              })
          }
        })
        await User.findOneAndUpdate(
          { githubId: profile.id },
          { $set: { token: accessToken } },
          (err, result) => {
            if (err) {
              console.log(err)
            }
          }
        )
      } catch (e) {
        console.log("NOT ALLOWED", e)
      }
    }
  )
)
