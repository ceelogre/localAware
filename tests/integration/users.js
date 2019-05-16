const app = require('../../app')
const assert = require('assert')
const chai = require('chai')
const should = chai.should()
const chaiAsPromised = require('chai-as-promised')
const UserModel = require('../../models/users')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)
chai.use(chaiAsPromised)

const mockUser = {
  handle: 'Tali',
  key: 'ilat',
  privilege: 'admin'
}
const chainsmokers = {
  handle: '@chain',
  key: 'srekoms'
}

before (function () {
  const requester = chai.request(app).keepOpen()

  Promise.all([
    requester.post('/api/v1/users')
      .type('form')
      .send(mockUser),
    requester.post('/api/v1/users')
      .type('form')
      .send(chainsmokers)
  ])
    .then(
      () => {
        requester.close()
      }
    )
})

describe(' User integration suite', function () {

  it('should return a user with name Tali', function () {
    return chai.request(app)
      .get('/api/v1/users')
      .should.eventually.have.a.property('body').that.is.an('array')
      .that.has.lengthOf(2)
  })
})
