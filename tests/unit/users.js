const assert = require('assert')
const mocha = require('mocha')
const should = mocha.should
const UserModel = require('../../models/users')

const mockUser = new UserModel({
  handle: 'Obi',
  key: 'iboi',
  privilege: 'admin'
})
describe('Users suite', function () {
  it('should accepth a user with len 3 or more', function () {
    assert(mockUser.isHandleValid(), true, ' Username very short')
  })
  it('should accept this object\'s privilege', function () {
    assert(mockUser.isPrivilegeValid(), true, ' Unallowed privilege')
  })
  it('should return all admins', function () {
    UserModel.findAdmins(mockUser.privilege, function (err, admins) {
      should.not.exist(err)
    })
  })
})
