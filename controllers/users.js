const UserModel = require('../models/users')

exports.createUser = async function (req, res) {
  let newUserDocument = new UserModel({
    handle: req.body.handle,
    key: req.body.key,
    privilege: req.body.privilege
  })
  let doc = await newUserDocument.save()
  res.json(doc)
}
exports.getUsers = async function (req, res) {
  let users = await UserModel.findall()
  res.json(users)
}
exports.getUser = function () {

}
exports.updateUser = async function () {
  let doc.name = 'foo'

  // Mongoose sends a `updateOne({ _id: doc._id }, { $set: { name: 'foo' } })`
  // to MongoDB.
  await doc.save()
}
exports.deleteUsers = function () {

}
exports.deleteUser = function () {

}
