const Goal = require('../models/goal.model')
const { sortArrayOfObjectsByGrade } = require('./utils')

const getAllUserGoals = async (userId, filters = {}) => {
  try {
    const goals = await Goal.find({ userId, ...filters })
    if (!goals) return []

    sortArrayOfObjectsByGrade(goals, 'grade')
    return goals
  } catch (error) {
    throw new Error(error.name)
  }
}

module.exports = {
  getAllUserGoals
}