
let github = require('octonode')
require("dotenv").config()
const passport = require("passport")

module.exports = (server) => {

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
    let client = github.client(req.user.token, {
      Accept: 'application/vnd.github.v3+json'
    })
    let container = []
     client.get(`/user/orgs`, (err, status, body, headers) => {
       if(body) {
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
    }catch(e) {
      console.log(e)
    }
  })
  
  server.get('/api/repos',(req, res, next) => {
    try {
      let client = github.client(req.user.token, {
        Accept: 'application/vnd.github.v3+json'
      })
      let container = []
      client.get('user/repos', (err, status, body, headers) => {
        if(body) {

          body.forEach(element => {
            // console.log(element.full_name)
            // if(element.permissions.admin === true) {
              container.push({
                repo: element.full_name,
                description: element.description,
                Organizations: element.owner.id,
                commits: element.commits_url,
                hook: element.hooks_url,
                admin: element.permissions.admin
              })
              // }
            })
          }
          res.json(container)
        })
      } catch(e) {
        console.log(e, 'NOT ALLOWED')
      }
  })



}
