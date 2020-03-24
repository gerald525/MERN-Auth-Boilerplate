let mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern-sei', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports.User = require('./user')
