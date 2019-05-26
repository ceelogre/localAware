const chai = require('chai')
const should = chai.should
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

describe('CREATE Events suite', function () {
  let token
  before('Register and authenticate a user ', async function () {
    const superagent = chai.request(app).keepOpen()
    try {
      await superagent.post('/api/v1/users')
        .send({ handle: 'Logic', key: 'cigol' })
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
      .send({ name: 'Signal processing', happeningOn: 'June 5, 2019', organizedBy: 'Farida', location: 'CR4' })
      .should.eventually.have.a.deep.property('body', 'TDD')
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
