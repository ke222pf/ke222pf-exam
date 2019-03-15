const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  githubId: String,
  token: String,
  username: String,
  socketId: {
    type: String
  },
  mail: {
    type: String
  }
})

const User = mongoose.model("user", userSchema)

module.exports = User
