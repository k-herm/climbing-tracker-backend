const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const { getAllUserProjects } = require('./project.queries')
const { getAllUserClimbs } = require('./climb.queries')
const { getAllUserAttempts } = require('./attempt.queries')

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

const getUser = async (email) => {
  const user = await User.findOne({ email }, (error, result) => {
    if (error) {
      throw new Error('Network Error.', error)
    }
  })
  if (!user) throw new Error(`No user found for email ${email}`)
  return user
}

const getUserData = async (userId, climbFilters = {}) => {
  const filters = { ...climbFilters }
  if (climbFilters.routeStyle) {
    filters.routeStyle = { $all: climbFilters.routeStyle }
  }
  const p = getAllUserProjects(userId, filters)
  const c = getAllUserClimbs(userId, filters)
  const a = getAllUserAttempts(userId)
  const results = await Promise.all([p, c, a])

  const projects = results[0]
  const climbs = results[1]
  const attempts = results[2]

  return { projects, climbs, attempts }
}

module.exports = {
  signin,
  getUser,
  getUserData
}


