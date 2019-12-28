const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const signin = async (email, password) => {
  const user = await User.findOne({ email }, (error, result) => {
    if (error) {
      throw new Error('Network Error.', error)
    }
  })
  if (!user) throw new Error(`No user found for email ${email}`)

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  await user.generateToken()
  return user
}

module.exports = {
  signin
}


