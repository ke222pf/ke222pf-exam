const hook = require("../models/hookSender")
const authClinet = require("../utils/githubHook")
const User = require("../models/user")
module.exports = async data => {
  let currentUser = await User.findOne({ username: data.username })
  let githubUser = authClinet(data.hook, data.belongs, currentUser.token)

  let userHook = await hook.find({ login: data.username })
  console.log(userHook.hookId)
  userHook.forEach(async element => {
      if(element.belongs === data.belongs) {
        console.log(element)
          githubUser.deleteHook(element.hookId, (err, result) => {
            if (err) {
              console.log(err)
            }
            console.log(result)
          })
          await hook.findOneAndRemove({ belongs: element.belongs })
      }
  })
}
