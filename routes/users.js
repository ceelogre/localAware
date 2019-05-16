const express = require('express')
const router = express.Router()
const userCRUD = require('../controllers/users')

// Create a new user
router.post('/', userCRUD.createUser)

// Get users
router.get('/', userCRUD.getUsers)

// Update a user
router.put('/:id', userCRUD.updateUser)

module.exports = router
