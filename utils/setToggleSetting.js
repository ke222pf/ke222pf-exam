const settings = require("../models/hookSettings")

module.exports = client => {
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
    } catch (e) {
      console.log(e)
    }
  })
}
