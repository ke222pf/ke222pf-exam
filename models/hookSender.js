const mongoose = require("mongoose")
const Schema = mongoose.Schema

const hook = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  }
})

const Hook = mongoose.model("hook", hook)

module.exports = Hook
