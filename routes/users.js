const express = require('express')
const router = express.Router()
const userCRUD = require('../controllers/users')

// Create a new user
router.post('/', userCRUD.createUser)

// Get users
router.get('/', userCRUD.getUsers)
router.get('/:id', userCRUD.getUser)

// Update a user
router.put('/:id', userCRUD.updateUser)

// Delete user
router.delete('/:id', userCRUD.deleteUser)

// Auth user
router.post('/auth', userCRUD.auth)

module.exports = router
