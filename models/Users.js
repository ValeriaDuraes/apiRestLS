const mongoose = require('mongoose')

const Users = mongoose.model('Users', {
  name: String,
  email: String,
  cpf: Number,
  approved: Boolean,
})

module.exports = Users