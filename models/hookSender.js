const mongoose = require("mongoose")
const Schema = mongoose.Schema

const hook = new Schema({
  idUser: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  hookId: {
    type: String,
    required: true
  }
})

const Hook = mongoose.model("hook", hook)

module.exports = Hook
