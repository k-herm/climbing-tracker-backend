const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const createUser = async (name, email, password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return new Error('Passwords do not match.')
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const user = new User({ name, email, password: hashPassword })
  try {
    await user.save()
    return user
  } catch (error) {
    return new Error(error)
  }
}

module.exports = {
  createUser
}
