const UserModel = require('../models/users')

exports.createUser = async function (req, res) {
  let newUserDocument = new UserModel({
    handle: req.body.handle,
    key: req.body.key,
    privilege: req.body.privilege
  })
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
  let user = await UserModel.find({ '_id': req.params.id })
  if (user.length === 0) res.status(201).json('User not found')
  else res.status(201).json(user)
}
exports.updateUser = async function (req, res) {
  let doc = await UserModel.findOne({ '_id': req.params.id })

  // Mongoose sends a `updateOne({ _id: doc._id }, { $set: { handle: 'new name' } })`
  // to MongoDB.
  if (req.body.handle) doc.handle = req.body.handle
  try {
    await doc.save()
  } catch (err) {
    console.error(err, ' Update failed')
  }
  res.status(201).json(doc)
}
exports.deleteUsers = function () {

}
exports.deleteUser = function () {

}
