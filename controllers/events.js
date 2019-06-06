const EventsModel = require('../models/events')
const UsersModel = require('../models/users')

exports.getEvents = async function (req, res) {
  let events = await EventsModel.find()
  res.status(200).json(events)
}

exports.createEvent = async function (req, res) {
  // Save the id of the logged in user as the creator of an event
  // Get their handle from the logged in users global variable,
  // Use it to search their id, add it to the event document
  let thisUser = global.loggedInUsers.find(user => user.token === req.headers.token)
  let userDocument = await UsersModel.findOne({ handle: thisUser.handle })
  let eventDocument = new EventsModel({
    name: req.body.name,
    happeningOn: req.body.happeningOn,
    organizedBy: req.body.organizedBy,
    creator: userDocument._id,
    location: req.body.location
  })
  try {
    let eventDoc = await eventDocument.save()
    res.status(201).json(eventDoc)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(200).json({ 'error': 'Missing or invalid form field' })
    } else {
      res.status(200).json({ 'error': 'Event not registered. Try again' })
    }
  }
}
exports.getUserEvents = async function (req, res) {
  let userEvents = await EventsModel.find({ _id: req.params.id })
  res.status(200).json(userEvents)
}
