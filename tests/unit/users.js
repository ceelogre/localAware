const assert = require('assert')
const mocha = require('mocha')
const should = mocha.should
const UserModel = require('../../models/users')

const mockUser = new UserModel({
  handle: 'Obi',
  key: 'iboi',
  privilege: 'Admin'
})
describe('Users suite', function () {
  it('should accepth a user with len 3 or more', function () {
    assert(mockUser.isHandleValid(), true, ' Username very short')
  })
  it('should save a new user', function () {
    mockUser.save(function (err) {
      should.not.exist(err)
    })
  })
})
