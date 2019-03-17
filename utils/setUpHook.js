const hook = require("../models/hookSender")
const User = require("../models/user")
const authClinet = require("../utils/githubHook")
module.exports = async data => {
  let currentUser = await User.findOne({ username: data.username })
  let githubUser = authClinet(data.hook, data.belongs, currentUser.token)

  githubUser.hook(
    {
      name: "web",
      active: true,
      events: ["push", "issues"],
      config: {
        content_type: "json",
        url: `https://7b35f708.ngrok.io/hook/${currentUser.githubId}`
      }
    },
    async (err, result) => {
      if (err) {
        console.log(err.body.errors)
      }
      if (result) {
          console.log('updated hook')
        await new hook({
          hookId: result.id,
          idUser: currentUser.githubId,
          login: data.username,
          belongs: data.belongs
        }).save()
      }
    }
  )
}
