const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const signin = async (email, password) => {
  const user = await User.findOne({ email }, (error, result) => {
    if (error) {
      console.log('Error: ', error)
      return new Error('Network Error.')
    }
  })
  if (!user) return new Error(`No user found for email ${email}`)

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return new Error('Invalid password')
  }

  return user
}

module.exports = {
  signin
}


