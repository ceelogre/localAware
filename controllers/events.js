const eventsModel = require('../models/events')

exports.getEvents = async function (req, res) {
  let events = await eventsModel.find()
  res.status(201).json(events)
}

exports.createEvent = async function (req, res) {
  res.status(201).json('TDD')
}
