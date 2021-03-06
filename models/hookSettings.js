const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NotificationSetting = new Schema({
  bool: {
    type: Boolean,
    required: true
  },
  belongsTo: {
    type: String,
    required: true
  },
  hook: {
    type: String,
    required: true
  },
  currentUser: {
    type: String,
    required: true
  }
})

const Setting = mongoose.model("setting", NotificationSetting)

module.exports = Setting
