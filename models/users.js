const mongoose = require('mongoose')
const Schema = mongoose.schema

const userSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  privilege: {
    type: String,
    default: 'attendee'
  }
})

userSchema.statics = {
  isHandleValid: function () {

  },
  findAll: function (cb) {
    return this.find(cb)
  }
}
const userModel = mongoose.Model('user', userSchema)

module.exports = userModel
