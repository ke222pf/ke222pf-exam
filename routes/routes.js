let github = require("octonode")
const hook = require("../models/hookSender")
const User = require("../models/user")
require("dotenv").config()
const passport = require("passport")
const client = require("../utils/authGithub")
const moment = require("moment")
const nodeMailer = require("../config/nodeMailer")
const setIfUserWantsMail = require("../utils/setIfUserWantMail")
moment.locale("sv")
 
module.exports = server => {
  server.get(
    "/api/login/github",
    passport.authenticate("github", {
      scope: ["repo"]
    })
  )
  server.get("/api/currentUser", async (req, res, next) => {
    req.user.io = req.cookies.io
    await User.findOneAndUpdate(
      { username: req.user.username },
      { $set: { socketId: req.user.io } }
    )
    let auth = {
      username: req.user.username
    }
    res.json(auth)
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
      let githubUser = await client(req.user.token)
      setIfUserWantsMail(req.io, req.user.username)
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
              admin: element.permissions.admin,
              avatar: element.owner.avatar_url
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
    let user = await hook.findOne({ idUser: req.params.id })
    let timeStamp = moment().format("YYYY-MM-DD LTS")
    let currentUser = await User.findOne({ githubId: req.params.id })
    if (req.io.sockets.sockets[currentUser.socketId] !== undefined) {
      console.log(req.body.zen)
      if(req.body.zen) {
        console.log('subscribed to a hook!')
        let hookData = {
          repo: req.body.repository.name,
          login: req.body.sender.login,
          subscribed: true
        }
        req.io.to(currentUser.socketId).emit("notification", hookData)
      } else if (user) {
        let hookData = {
          id: req.body.sender.id,
          login: req.body.sender.login,
          action:
            req.headers["x-github-event"] + " " + req.body.action || "commits",
          repo: req.body.repository.name,
          time: timeStamp
        }
        // console.log(d)
        console.log(hookData, "hook data")
        req.io.to(currentUser.socketId).emit("notification", hookData)
      }
      res.send(200)
    } else {
      let hookData = {
        login: req.body.sender.login,
        action:
            req.headers["x-github-event"] + " " + req.body.action || "commits",
        repo: req.body.repository.name,
        time: timeStamp,
        sinceLastTime: false
      }
      console.log(currentUser.id)
      await User.findByIdAndUpdate(
        currentUser.id,
        { $push: { Notifications: hookData } },
        { upsert: true, new: true }
      )
      nodeMailer(currentUser.mail, hookData)
      console.log("Socket not connected")
    }
  })

  server.get("/api/getNotifications", async (req, res, next) => {
    console.log(req.user.username, "this is the user")
    let currentUser = await User.findOne({ username: req.user.username })
    let arr = []
    currentUser.Notifications.forEach(element => {
      arr.push(element)
    })
    arr.flat()
    res.json(arr)
    await User.findByIdAndUpdate(currentUser.id, {
      $set: { Notifications: [] }
    })
  })
}
