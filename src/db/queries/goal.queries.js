const Goal = require('../models/goal.model')

const getAllUserGoals = async (userId, filters = {}) => {
  try {
    const goals = await Goal.find({ userId, ...filters })
      .sort({ date: 'desc' })

    if (!goals) return []
    return goals
  } catch (error) {
    throw new Error(error.name)
  }
}

module.exports = {
  getAllUserGoals
}