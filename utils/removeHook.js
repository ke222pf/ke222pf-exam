const hook = require("../models/hookSender")
const authClinet = require("../utils/githubHook")
const User = require("../models/user")
module.exports = async data => {
  let currentUser = await User.findOne({ username: data.username })
  let githubUser = authClinet(data.hook, data.belongs, currentUser.token)

  let userHook = await hook.findOne({ login: data.username })
  console.log(userHook.hookId)
  githubUser.deleteHook(userHook.hookId, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  })
  await hook.findOneAndRemove({ login: data.username })
}
