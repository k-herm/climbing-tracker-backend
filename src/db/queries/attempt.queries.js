const Attempt = require('../models/attempt.model')

const getAllProjectAttempts = async (userId, projectId) => {
  try {
    const attempts = await Attempt.find({ userId, projectId })
      .sort({ date: 'desc' })

    if (!attempts) return []
    return attempts
  } catch (error) {
    throw new Error(error.name)
  }
}

const getAllUserAttempts = async (userId) => {
  try {
    const attempts = await Attempt.find({ userId })
      .sort({ projectId: 'desc' })

    if (!attempts) return []
    return attempts
  } catch (error) {
    throw new Error(error.name)
  }
}

module.exports = {
  getAllProjectAttempts,
  getAllUserAttempts
}