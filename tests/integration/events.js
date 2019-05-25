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
  it('should not create an event if not loggedIn', function () {
    const sashaSloan = {}
  })
})