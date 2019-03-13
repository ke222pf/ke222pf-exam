const settings = require("../models/hookSettings")
let github = require("octonode")
const getToggleData = require('./setNotificationSetting')
const setToggleSetting = require('./setToggleSetting')
module.exports = (io) => {
  io.on("connection", client => {
    console.log("websocket is connected")
    getToggleData(client)
    setToggleSetting(client, io)
    client.on('disconnect',() => {
      console.log('disconnected')
      client.disconnect()
    }) 
  })
}
