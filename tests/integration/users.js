const app = require('../../app')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
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

const updatedUser = {
  handle: '@smokers'
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

describe(' Create/Get user User suite', function () {
  it('should not create a user with an existing handle', function () {
    return chai.request(app)
      .post('/api/v1/users')
      .send(chainsmokers)
      .should.eventually.be.an('object').that.has.deep.property('body', { 'Error': 'Handle already exists' })
  }, 'Error messages don\'t match')
  it('should return all users', function () {
    return chai.request(app)
      .get('/api/v1/users')
      .should.eventually.have.a.property('body').that.is.an('array')
      .that.has.lengthOf(2)
  })
  let firstUser
  before( function () {
    let superagentRequest = chai.request(app)
      .get('/api/v1/users')
    superagentRequest.end((err, res) => {
      if (err) return err
      firstUser = (res.body[0])
    })
    return null
  })
  it('should return a single user with the given id', function () {
    return chai.request(app)
      .get('/api/v1/users/' + firstUser._id)
      .should.eventually.have.property('body')
      .that.is.an('array').that.has.lengthOf(1)
  })
  it('should update a user details given their id', function () {
    return chai.request(app)
      .put('/api/v1/users/' + firstUser._id)
      .send(updatedUser)
      .should.eventually.be.a('object').that.has.property('body')
      // Check value too
      .that.has.any.keys({ 'handle': '@smokers' })
  })
  it('should not update a non-existing user', function () {
    return chai.request(app)
      .put('/api/v1/users/' + '5cdf00000040000000000008')
      .send(updatedUser)
      .should.eventually.be.a('object')
      .that.has.deep.property('body', { 'Error': 'User with the given id not found' })
  })
})
