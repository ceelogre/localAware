const express = require('express')
const router = express.Router()
const eventsCRUD = require('../controllers/events.js')
const jwt = require('jsonwebtoken')

router.get('/', eventsCRUD.getEvents)

router.post('/', validateUser, eventsCRUD.createEvent)

function validateUser (req, res, next) {
  // Pass
  if (req.headers.token) {
    try {
      jwt.verify(req.headers.token, global.sharedKey)
      next()
    } catch (error) {
      if (error.message === 'invalid signature') res.status(406).json('Invalid signature')
      else if (error.name === 'TokenExpiredError') res.status(406).json('Token expired')
      else res.status(406).json({ error: 'Invalid token' })
    }
  } else {
    res.status(406).json({ error: 'Missing token' })
  }
}

module.exports = router
