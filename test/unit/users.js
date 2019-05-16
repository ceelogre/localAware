const assert = require('assert')
const chai = require('chai')
const should = chai.should()
const chatAsPromised = require('chai-as-promised')
const UserModel = require('../../models/users')

chai.use(chatAsPromised)
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
  
  it('should return a hash string with length 60', function () {
    return mockUser.maskKey().should.eventually.have.length(60)
  })
})
