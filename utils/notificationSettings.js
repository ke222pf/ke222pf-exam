const settings = require("../models/hookSettings")
let github = require('octonode')
module.exports = (io) => {
  io.on("connection", client => {
    console.log("websocket is connected")
    client.on("boolean" , async data => {
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
      // console.log(getUser, 'från notification')
      // getUser.hook({
      //   "name": "web",
      //   "active": true,
      //   "events": ["push", "pull_request"],
      //   "config": {
      //     "url": `${data.hook}`
      //   }
      // }, (err, result) => {
      //   console.log(result)
      // }) // hook
        // console.log(req.user.token, 'från notification')
    })
    client.on("sendData", async () => {
        try {
      let result = await settings.find({})
      let arr = []
      result.forEach(element => {
        console.log(element.bool)
        arr.push({ bool: element.bool, belongsTo: element.belongsTo })
      })
      console.log(arr)
      client.emit("setSettings", arr)
    } catch(e) {
      console.log(e)
    }
    })
  })
}
