const assert = require('assert')
const chai = require('chai')
const should = chai.should()
const chaiAsPromised = require('chai-as-promised')
const UserModel = require('../../models/users')
const chaiHttp = require('chai-http')

const server = 'http://localhost:2120/api/v1'

chai.use(chaiHttp)
chai.use(chaiAsPromised)

const mockUser = {
  handle: 'Tali',
  key: 'ilat',
  privilege: 'admin'
}

before (function () {
  return chai.request(server)
    .post('/users')
    .type('form')
    .send(mockUser)
})

describe(' User integration suite', function () {

  it('should return a user with name Tali', function () {
    return chai.request(server)
      .get('/users')
      .should.eventually.have.a.property('body').that.is.an('array')
      .that.has.all.keys('0')
  })
})
