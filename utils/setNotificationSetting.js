const settings = require("../models/hookSettings")
const setUpHook = require("./setUpHook")
const removeHook = require("./removeHook")
const User = require("../models/user")

module.exports = async client => {
  client.on("boolean", async data => {
    let found = false
    let currentRepos = await settings.find({ belongsTo: data.belongs })
    if (currentRepos.length >= 1) {
      currentRepos.forEach(async element => {
        if (element.currentUser === data.username) {
          found = true
          await settings.findByIdAndUpdate(element.id, {
            $set: { bool: data.boolean }
          })
        }
      })
    }
    if (!found) {
      new settings({
        bool: data.boolean,
        belongsTo: data.belongs,
        hook: data.hook,
        currentUser: data.username
      }).save()
    }
  })
  client.on("email", async mail => {
    await User.findOneAndUpdate(
      { username: mail.user },
      { $set: { mail: mail.mail } }
      )
    })
    client.on("removeEmail", async user => {
      await User.findOneAndUpdate(
        { username: user },
        { $set: { mail: "NoEmail" } }
        )
      })
      client.on("hookSettings", async hookData => {
        if (hookData.boolean) {
          await setUpHook(hookData)
        }else {
          removeHook(hookData)
        }
    
      })
    }
    