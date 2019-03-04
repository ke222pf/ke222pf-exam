const mongoose = require("mongoose")
require("dotenv").config()
const url = process.env.DB_URL
module.exports = function() {
  mongoose.connect(url, { useNewUrlParser: true })
  mongoose.connection.on("connected", function() {
    console.log("mongoose default connection open to ", url)
  })
  mongoose.connection.on("error", function(error) {
    console.log("mongoose dafault connection error", error)
  })
  mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection disconnected")
  })
  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log(
        "Mongoose default connection disconnected through app termination"
      )
      process.exit(0)
    })
  })
}
