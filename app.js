const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('./configs/config')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

if (process.env.NODE_ENV === 'production') {
  app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
}

app.listen('2120', () => {
  console.log('We\'re in business. App running in ', process.env.NODE_ENV, ' on port 2120')
})

module.exports = app
