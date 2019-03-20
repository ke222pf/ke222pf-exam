const hook = require("../models/hookSender")
const authClinet = require("../utils/githubHook")
const User = require("../models/user")
module.exports = async data => {
  let currentUser = await User.findOne({ username: data.username })
  let githubUser = authClinet(data.hook, data.belongs, currentUser.token)

  let userHook = await hook.find({ login: data.username })
  userHook.forEach(async element => {
    if (element.belongs === data.belongs) {
      await githubUser.deleteHook(element.hookId, async (err, result) => {
        if (err) {
          console.log(err)
        }
        await hook.findByIdAndDelete(element.id)
      })
    }
  })
}
