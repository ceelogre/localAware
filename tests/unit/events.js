const EventModel = require('../../models/events')

const eventObject = {
  name: 'Signal processing',
  happeningOn: 'June 19, 2019',
  organizedBy: 'Farida',
  location: 'CR4'
}

describe(' Event model ', function () {
  it('should return true for this object\'s date', function () {
    const eventDocument = new EventModel(eventObject)
    eventDocument.isEventDateValid().should.equal(true)
  })
  it('should fail if event date is less than now', function () {
    // Change the date to past
    eventObject.happeningOn = 'June 5, 1970'
    const eventDocument = new EventModel(eventObject)
    // Assert that this document was not saved
    return eventDocument.save().should.eventually.be.rejected
  })
})
