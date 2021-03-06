const config = require('config')
const mongoose = require('mongoose')

const connection = config.get('db')

const db = mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
  console.log('connect')
})

module.exports = db