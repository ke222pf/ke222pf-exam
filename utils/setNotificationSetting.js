const settings = require("../models/hookSettings")
const setUpHook = require("./setUpHook")
const removeHook = require("./removeHook")
const User = require("../models/user")
module.exports = client => {
  client.on("boolean", async data => {
    let found = false
    let currentRepos = await settings.find({ belongsTo: data.belongs })
    if(currentRepos.length >= 1) {
      currentRepos.forEach(async element => {
        if(element.currentUser === data.username) {
          found = true
          console.log('update')
          await settings.findByIdAndUpdate(
             (element.id),
            { $set: { bool: data.boolean } }
            )
          }
        })
      }
      if(!found) {
        console.log('add')
          new settings({
            bool: data.boolean,
            belongsTo: data.belongs,
            hook: data.hook,
            currentUser: data.username
          }).save()
      } 

    if (data.boolean === true) {
      setUpHook(data)

    } else {
      removeHook(data)
    }
  })  
      client.on('email', async mail => {
       await User.findOneAndUpdate({username: mail.user}, {$set:{mail: mail.mail}})
        console.log(mail.user)
      })
      client.on('removeEmail', async (user) => {
        await User.findOneAndUpdate({username: user}, {$set:{mail: "NoEmail"}})
        console.log('reset email')
      })
}
