let github = require('octonode')
module.exports = (token, next) => {
   return github.client(token, {
        Accept: 'application/vnd.github.v3+json'
      })
}