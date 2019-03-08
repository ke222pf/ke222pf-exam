const settings = require("../models/hookSettings")
let github = require("octonode")
const getToggleData = require('../utils/getToggleData')
const setToggleSetting = require('../utils/setToggleSetting')
module.exports = io => {
  io.on("connection", client => {
    console.log("websocket is connected")

    getToggleData(client)
    setToggleSetting(client)
    
  })
}
