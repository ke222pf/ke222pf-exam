let github = require('octonode')
module.exports = (url, belongs, token) => {
    console.log(belongs)
   let client = github.client(token, {
        Accept: 'application/vnd.github.v3+json'
      })
     let ghrepo =  client.repo(belongs)
     return ghrepo
}