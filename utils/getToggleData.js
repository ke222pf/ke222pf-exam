const settings = require("../models/hookSettings")
const authClinet = require("../utils/githubHook")
const User = require("../models/user")
const hook = require("../models/hookSender")
const setUpHook = require("../utils/setUpHook")
const removeHook = require("../utils/removeHook")
module.exports = client => {
  client.on("boolean", async data => {
    let currentRepo = await settings.findOne({ belongsTo: data.belongs })
    if (!currentRepo) {
      new settings({
        bool: data.boolean,
        belongsTo: data.belongs,
        hook: data.hook,
        curretUser: data.username
      }).save()
    } else {
      await settings.findOneAndUpdate(
        { belongsTo: data.belongs },
        { $set: { bool: data.boolean } }
      )
    }
    console.log(data.boolean, "value")
    if (data.boolean === true) {
      setUpHook(data)
      console.log("add web hook")
    } else {
      removeHook(data)
    }
  })
}
