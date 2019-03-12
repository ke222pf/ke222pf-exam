const hook = require("../models/hookSender")
const User = require("../models/user")
const authClinet = require("../utils/githubHook")
module.exports = async data => {
  let currentUser = await User.findOne({ username: data.username })
  let githubUser = authClinet(data.hook, data.belongs, currentUser.token)
  let getHook = await hook.findOne({ login: data.username })
  githubUser.hook(
    {
      name: "web",
      active: true,
      events: ["push", "issues"],
      config: {
        content_type: "json",
        url: ` https://a2584a6f.ngrok.io/hook`
      }
    },
    (err, result) => {
      if (err) {
        console.log(err)
      }
      if (getHook) {
      } else {
        new hook({
          id: result.id,
          login: data.username
        }).save()
      }
      console.log(result)
    }
  )
}
