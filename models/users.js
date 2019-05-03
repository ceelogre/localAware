const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

// Methods for the document instance. These will be used for validation and auth
userSchema.methods = {
  isHandleValid: function () {
    return this.handle.length > 2
  },
  findAll: function (cb) {
    return this.find(cb)
  }
}
const userModel = mongoose.model('user', userSchema)

module.exports = userModel
