const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
require('./configs/config')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const spinTestDb = require('./utils/testDb')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// Set the env
if (process.argv[2]) process.env.NODE_ENV = process.argv[2]

// Create an in memory db
if (process.env.NODE_ENV === 'test') {
  spinTestDb().then(
    db => {
      mongoose.connect(db.location, { useNewUrlParser: true }, function (error) {
        if (error) console.log('Error starting db ', error)
      })
    })
} else if (process.env.NODE_ENV === 'production') {
  app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
} else {
  mongoose.connect('mongodb://localhost:27017/dista', { useNewUrlParser: true }, function (error) {
    if (error) console.log('Error starting db ', error)
  })
}

app.listen('2120', () => {
  console.log('We\'re in business. App running in ', process.env.NODE_ENV, ' mode on port 2120')
})

module.exports = app
