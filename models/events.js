const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  happeningOn: {
    type: Date,
    required: true
  },
  organizedBy: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  attendees: {
    type: Array
  }
})

const eventsModel = mongoose.model('events', eventsSchema)
module.exports = eventsModel
