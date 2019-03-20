let github = require("octonode")
module.exports = (url, belongs, token) => {
  let client = github.client(token, {
    Accept: "application/vnd.github.v3+json"
  })
  let ghrepo = client.repo(belongs)
  return ghrepo
}
