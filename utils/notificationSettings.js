const settings = require("../models/hookSettings")
let github = require("octonode")
const getToggleData = require('../utils/getToggleData')
const setToggleSetting = require('../utils/setToggleSetting')
module.exports = (io, currentUser) => {
  console.log(currentUser)
  io.on("connection", client => {
    console.log("websocket is connected")
    console.log(client.id)
    getToggleData(client)
    setToggleSetting(client)
    client.on('disconnect',() => {
      console.log('disconnected')
      client.disconnect()
    }) 
  })
}
