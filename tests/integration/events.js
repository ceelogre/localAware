const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiAsPromised = require('chai-as-promised')
const app = require('../../app')

chai.use(chaiAsPromised)
chai.use(chaiHttp)

describe('GET Events suite ', function () {
  it('should return an empty array of events', function () {
    return chai.request(app)
      .get('/api/v1/events')
      .should.eventually.be.an('object').that.has.property('body').that.is.empty
  })
})

let userId, token
describe('CREATE Events suite', function () {
  before('Register and authenticate a user ', async function () {
    const superagent = chai.request(app).keepOpen()
    try {
      let response = await superagent.post('/api/v1/users')
        .send({ handle: 'Logic', key: 'cigol' })
      userId = response.body._id
    } catch (err) {
      console.error(err)
    }
    try {
      let response = await superagent.post('/api/v1/users/auth')
        .send({ handle: 'Logic', key: 'cigol' })
      token = response.body.token
    } catch (err) {
      console.error(err)
    }
    superagent.close()
  })
  it('should create an event if user is loggedIn', function () {
    return chai.request(app)
      .post('/api/v1/events')
      .set('token', token)
      .send({ name: 'Signal processing', happeningOn: 'June 9, 2019', organizedBy: 'Farida', location: 'CR4' })
      .should.eventually.have.a.property('body')
      .that.includes.all.keys('location', 'name', 'happeningOn', 'createdOn', 'attendees')
  })
  it('should not create an event if token is not set ', function () {
    return chai.request(app)
      .post('/api/v1/events')
      .send({ name: 'Signal processing', happeningOn: 'June 5, 2019', organizedBy: 'Farida', location: 'CR4' })
      .should.eventually.have.a.deep.property('body', { error: 'Missing token' })
  })
  it('should not create an event if token is invalid', function () {
    return chai.request(app)
      .post('/api/v1/events')
      .set('token', 'I.Think.Therefore')
      .send({ name: 'Signal processing', happeningOn: 'June 5, 2019', organizedBy: 'Farida', location: 'CR4' })
      .should.eventually.have.a.deep.property('body', { error: 'Invalid token' })
  })
})
describe('GET Events suite ', async function () {
  before(' Register an event ', async function () {
    const superagent = chai.request(app).keepOpen()
    try {
      let response = await superagent.post('/api/v1/users')
        .set('token', token)
        .send({ name: 'Signal processing', happeningOn: 'June 9, 2019', organizedBy: 'Farida', location: 'CR4' })
      userId = response.body.creator
    } catch (err) {
      console.error(err)
    }
    superagent.close()
  })
  it('should return an array with one event', function () {
    return chai.request(app)
      .get('/api/v1/events')
      .should.eventually.be.an('object').that.has.property('body').that.has.any.keys('0')
  })
  it('should return events created by a specific user given a valid user id', function () {
    // Create an event and retrieve it
    
    return chai.request(app)
      .get('/api/v1/events/' + userId)
      .should.eventually.be.an('object').that.has.property('body').that.has.any.keys('0')
  })
})
