const settings = require("../models/hookSettings")
const authClinet = require("../utils/githubHook")
const User = require("../models/user")
module.exports = client => {
  client.on("boolean", async data => {
    console.log(data, "från clienten")
    let currentRepo = await settings.findOne({ belongsTo: data.belongs })
    if (!currentRepo) {
      new settings({
        bool: data.boolean,
        belongsTo: data.belongs,
        hook: data.hook
      }).save()
    } else {
      await settings.findOneAndUpdate(
        { belongsTo: data.belongs },
        { $set: { bool: data.boolean } }
      )
    }
    let currentUser = await User.findOne({username: data.username})
    console.log(data.boolean, 'this belongs to')
    let githubUser = authClinet(data.hook, data.belongs, currentUser.token)
    githubUser.hook(
      {
        name: "web",
        active: true,
        events: ["push", "issues"],
        config: {
          url: `http://localhost:5000/hook`
        }
      },
      (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(result)
      }
    )
  })
}
