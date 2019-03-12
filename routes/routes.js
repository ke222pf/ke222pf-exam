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
  server.get("/api/currentUser", (req, res, next) => {
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
    req.user.io = req.cookies.io

    console.log(req.user.io, 'iawd')
    await User.findOneAndUpdate({username: req.user.username}, {$set: {socketId: req.user.io}})
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

  server.post("/hook", async (req, res) => {
    // console.log(req)
    if(req.body.action) {
    let hookData = {
      id: req.body.sender.id,
      login: req.body.sender.login,
      action: req.body.action,
      title: req.body.issue.title
    }
    let currentUser = await User.findOne({username: req.body.sender.login})
    req.io.to(currentUser.socketId).emit("notification", hookData)
  }

    console.log(hookData, "hook")
    // console.log(user.username)s
    res.send(200)
  })
}
