const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrptjs = require('bcryptjs')

const possiblePrivileges = {
  BASIC: 'attendee',
  SUPER: 'admin'
}
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
    default: possiblePrivileges.BASIC
  }
})

// Methods for the document instance. These will be used for validation and auth
userSchema.methods = {
  isHandleValid: function () {
    return this.handle.length > 2
  },
  isPrivilegeValid: function () {
    return Object.values(possiblePrivileges).includes(this.privilege)
  },
  maskKey: async function () {
    let salt = await bcrptjs.genSalt(10)
    return bcrptjs.hash(this.key, salt)
  }
}

// Statics for the model instance. Can be used for queries
userSchema.statics = {
  findAdmins: function (type, cb) {
    return this.find({ privilege: this.type })
  }
}
const userModel = mongoose.model('user', userSchema)

module.exports = userModel
