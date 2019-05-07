const chai = require('chai')
const should = chai.should()
const chaiAsPromised = require('chai-as-promised')
const UserModel = require('../../models/users')
const chaiHttp = require('chai-http')
const request = require('request')

const server = 'http://localhost:2120/api/v1'

chai.use(chaiHttp)
chai.use(chaiAsPromised)

const mockUser = {
  handle: 'Tali',
  key: 'ilat',
  privilege: 'admin'
}

request.post({ url: server + '/users', form: mockUser }, (err, res, users) => {
  if (err) throw (err)
  console.log('Naaaaah', users)
})
describe(' User integration suite', function () {


  it('should return all admins', function () {
    return UserModel.findAdmins(mockUser.privilege)
      .should.eventually.have.an('Object')
  })
})
