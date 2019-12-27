const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const createUser = async (name, email, password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    throw new Error('Passwords do not match.')
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashPassword })
    await user.save()
    return user

  } catch (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
}

module.exports = {
  createUser
}
