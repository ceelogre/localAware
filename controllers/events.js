const EventsModel = require('../models/events')

exports.getEvents = async function (req, res) {
  let events = await EventsModel.find()
  res.status(201).json(events)
}

exports.createEvent = async function (req, res) {
  let eventDocument = new EventsModel({
    name: req.body.name,
    happeningOn: req.body.happeningOn,
    organizedBy: req.body.organizedBy,
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
