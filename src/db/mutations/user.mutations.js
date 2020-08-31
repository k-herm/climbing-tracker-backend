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
    await user.generateToken()
    return user

  } catch (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
}

const logout = async (userId) => {
  try {
    const user = await User.findById(userId)
    user.generateToken()
    return { success: true }
  }
  catch (error) {
    throw new Error(error.message)
  }
}

const resetUserPassword = async (resetToken, password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    throw new Error('Passwords do not match.')
  }
  try {
    const user = await User.findOne({ resetToken }, (error, result) => {
      if (error) {
        throw new Error('Network Error.', error)
      }
    })
    if (user.resetTokenExpiry < Date.now() - 3600000) {
      throw new Error('This token is expired.')
    }

    const hashPassword = await bcrypt.hash(password, 10)
    user.password = hashPassword
    await user.save()

    return user
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
}

module.exports = {
  createUser,
  logout,
  resetUserPassword
}
