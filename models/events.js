const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Event name cannot be empty']
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  happeningOn: {
    type: Date,
    required: [true, 'Event date cannot be empty'],
    validate: {
      validator: function () {
        return this.happeningOn > Date.now()
      },
      message: props => `${props.value} date should be in the future`
    }
  },
  organizedBy: {
    type: String,
    required: [true, 'Organizer field cannot be empty']
  },
  creator: String,
  location: {
    type: String,
    required: [true, 'Location cannot be empty']
  },
  attendees: {
    type: Array
  }
})

eventsSchema.methods = {
  isEventDateValid: function () {
    return this.happeningOn > Date.now()
  }
}
const eventsModel = mongoose.model('events', eventsSchema)
module.exports = eventsModel
