const express = require('express')
require('dotenv').config()

const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

const usersRouter = require('./routes/users')
const eventsRouter = require('./routes/events')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/events', eventsRouter)

global.loggedInUsers = []
// Set the env
if (process.argv[2]) process.env.NODE_ENV = process.argv[2]

const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
// Create an in memory db
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'tests') {
  const spinTestDb = require('./utils/testDb')
  spinTestDb().then(
    db => {
      mongoose.connect(db.location, options, function (error) {
        if (error) console.log('Error starting db ', error)
      })
    })
} else if (process.env.NODE_ENV === 'production') {
  app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
  mongoose.connect('mongodb+srv://dista:rewqilike3@dista-wvmln.mongodb.net/test?retryWrites=true', options, function (err) {
    // TODO handle this error in production
    if (err) console.log('Error connecting to production db.', err)
  })
} else {
  NODE_ENV='development'
  mongoose.connect('mongodb://localhost:27017/dista', options, function (error) {
    if (error) console.log('Error starting db ', error)
  })
}

app.listen('2120', () => {
  console.log('We\'re in business. App running in ', process.env.NODE_ENV, ' mode on port 2120')
})

module.exports = app
