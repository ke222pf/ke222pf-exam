let github = require("octonode")
const hook = require("../models/hookSender")
const User = require("../models/user")
require("dotenv").config()
const passport = require("passport")
const client = require("../utils/authGithub")

module.exports = server => {
  server.get(
    "/api/login/github",
    passport.authenticate("github", {
      scope: ["repo"]
    })
  )
  server.get("/api/currentUser", async (req, res, next) => {
    req.user.io = req.cookies.io
    await User.findOneAndUpdate({username: req.user.username}, {$set: {socketId: req.user.io}})


    res.json(req.user)
    next
  })
  
  server.get(
    "/login/callback",
    passport.authenticate("github"),
    (req, res, next) => {
      // rendera klient sida
      res.redirect("http://localhost:3000/login", next)
    }
    )
    
    server.get("/api/logout", (req, res, next) => {
      req.logout()
      res.redirect("http://localhost:3000/", next)
    })
    
    server.get("/api/orgs", async (req, res, next) => {
    try {
      let githubUser = client(req.user.token)
      let container = []
      githubUser.get(`/user/orgs`, (err, status, body, headers) => {
        if (body) {
          body.forEach(element => {
            container.push({
              Organizations: element.login,
              url: element.url,
              issues: element.issues_url,
              hook: element.hooks_url,
              img: element.avatar_url,
              id: element.id
            })
          })
        }
        res.json(container)
      })
    } catch (e) {
      console.log(e)
    }
  })

  server.get("/api/repos", async (req, res, next) => {
    try {
      let githubUser = client(req.user.token)
      let container = []
      githubUser.get("user/repos", (err, status, body, headers) => {
        if (body) {
          body.forEach(element => {
            container.push({
              repo: element.full_name,
              description: element.description,
              Organizations: element.owner.id,
              commits: element.commits_url,
              hook: element.hooks_url,
              admin: element.permissions.admin
            })
          })
        }
        res.json(container)
      })
    } catch (e) {
      console.log(e, "NOT ALLOWED")
    }
  })

  server.post("/hook/:id", async (req, res) => {

    let user = await hook.findOne({idUser: req.params.id})
    if(user) {
    let hookData = {
      id: req.body.sender.id,
      login: req.body.sender.login,
      action: req.body.action
    }

    let currentUser = await User.findOne({githubId: req.params.id})
    req.io.to(currentUser.socketId).emit("notification", hookData)
  }
    res.send(200)
  })
}
