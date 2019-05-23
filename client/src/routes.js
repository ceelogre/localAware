import axios from 'axios'
const server = '/api/v1/'
const apiClient = axios.create({
  baseURL: server,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  createUser (user) {
    return apiClient.post('/users', user)
  },
  signin (user) {
    return apiClient.post('/users/auth', { user })
  }
}
