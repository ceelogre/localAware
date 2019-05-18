const UserModel = require('../models/users')

exports.createUser = async function (req, res) {
  let newUserDocument = new UserModel({
    handle: req.body.handle,
    key: req.body.key,
    privilege: req.body.privilege
  })
  if (!newUserDocument.isHandleValid()) {
    return res.status(201).json({ 'Failed': 'Username invalid' })
  }

  if (!newUserDocument.isPrivilegeValid()) {
    return res.status(201).json({ 'Failed': 'Invalid privilege' })
  }

  let doc
  try {
    doc = await newUserDocument.save()
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) res.status(406).json({ 'Error': 'Handle already exists' })
  }
  res.status(201).json(doc)
}
exports.getUsers = async function (req, res) {
  let users = await UserModel.find().select('')
  res.status(201).json(users)
}

exports.getUser = async function (req, res) {
  let doc = await retrieveUser(req, res)
  if (doc instanceof UserModel) res.status(201).json(doc)
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
    res.status(201).json({ 'Success': 'User successfully deleted' })
  } catch (err) {
    res.status(504).json({ 'Error': 'Operation not successful. Try again' })
  }
}
async function retrieveUser (req, res) {
  let doc = await UserModel.findOne({ '_id': req.params.id })

  // If user isn't found, just print the error message here, don't propagate it back to the calling function
  if (!doc) return res.status(404).json({ 'Error': 'User with the given id not found' })
  return doc
}