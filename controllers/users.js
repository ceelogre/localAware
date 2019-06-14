const UserModel = require('../models/users')
const EventsModel = require('../models/events')
const jwt = require('jsonwebtoken')

exports.createUser = async function (req, res) {
  let newUserDocument = new UserModel({
    handle: req.body.handle,
    key: req.body.key,
    privilege: req.body.privilege
  })
  if (!newUserDocument.isHandleValid()) {
    return res.status(400).json({ 'Failed': 'Username invalid' })
  }

  if (!newUserDocument.isPrivilegeValid()) {
    return res.status(400).json({ 'Failed': 'Invalid privilege' })
  }

  await newUserDocument.maskKey()
  let doc
  try {
    doc = await newUserDocument.save()
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) res.status(400).json({ 'Error': 'Handle already exists' })
  }
  res.status(201).json(doc)
}
exports.getUsers = async function (req, res) {
  let users = await UserModel.find().select('')
  res.status(200).json(users)
}

exports.getUser = async function (req, res) {
  let doc = await retrieveUser(req, res)
  if (doc instanceof UserModel) res.status(200).json(doc)
}
exports.updateUser = async function (req, res) {
  let doc = await retrieveUser(req, res)

  if (doc instanceof UserModel) {
    // Mongoose sends a `updateOne({ _id: doc._id }, { $set: { handle: 'new name' } })`
    // to MongoDB.
    if (req.body.handle) doc.handle = req.body.handle
    try {
      await doc.save()
      res.status(201).json(doc)
    } catch (err) {
      res.status(504).json({ 'Error': 'Operation not successful. Try again' })
    }
  }
}
exports.deleteUser = async function (req, res) {
  try {
    let deleteQuery = await UserModel.deleteOne({ _id: req.params.id })
    if (deleteQuery.deletedCount === 0) return res.status(201).json({ 'Failed': 'User not found' })
    // 204 means no content
    res.status(204).json({ 'Success': 'User successfully deleted' })
  } catch (err) {
    res.status(504).json({ 'Error': 'Operation not successful. Try again' })
  }
}

exports.auth = async function (req, res) {
  // Find the user
  let userDocument = await getUserByName(req, res)
  if (userDocument instanceof UserModel) {
    // Go on, check the password
    let result = await userDocument.auth(req.body.key)
    // if true the keys match
    if (result === true) {
      // Create token
      global.sharedKey = 'thePennyDropped'
      let token = await jwt.sign({ data: 'kibana' }, global.sharedKey, { expiresIn: 160 })
      let loggedInUser = {
        token,
        handle: req.body.handle
      }
      global.loggedInUsers.push(loggedInUser)
      res.status(201).json({ 'token': token, 'userObject': userDocument })
    } else {
      res.status(400).json({ 'Error': 'Invalid username or password' })
    }
  }
}

exports.getEvents = async function (req, res) {
  let eventsQuery = EventsModel.aggregate()
  eventsQuery.lookup({
    from: 'events',
    localField: '_id',
    foreignField: 'creator',
    as: 'userEvents'
  })
  eventsQuery.match({ creator: req.params.id })
  let results = await eventsQuery.exec()
  res.status(200).json(results)
}
async function retrieveUser (req, res) {
  let doc = await UserModel.findOne({ '_id': req.params.id })

  // If user isn't found, just print the error message here, don't propagate it back to the calling function
  if (!doc) return res.status(404).json({ 'Error': 'User with the given id not found' })
  return doc
}

async function getUserByName (req, res) {
  let doc = await UserModel.findOne({ 'handle': req.body.handle })

  // End the request cycle in case the user doesn't exists
  if (!doc) return res.status(400).json({ 'Error': 'Invalid username or password' })
  return doc
}
