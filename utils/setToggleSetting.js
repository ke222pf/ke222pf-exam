const settings = require("../models/hookSettings")
const User = require("../models/user")
module.exports = (client, io) => {
  client.on("sendData", async data => {
    try {
      let currentUser = await User.findOne({ username: data })
      let result = await settings.find({})
      let arr = []
      result.forEach(element => {
          console.log(element.currentUser,'this is a user')
        if (element.currentUser === data) {
          arr.push({ bool: element.bool, belongsTo: element.belongsTo })
        }
      })
      console.log('1')
      io.to(currentUser.socketId).emit("setSettings", arr)
      console.log(arr)
      console.log('2')
    } catch (e) {
      console.log(e)
    }
  })
}
