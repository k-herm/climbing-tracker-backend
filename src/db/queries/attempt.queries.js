const Attempt = require('../models/attempt.model')

const getAllUserAttempts = async (userId, filters = {}) => {
  try {
    const attempts = await Attempt.find({ userId, ...filters })
      .sort({ date: 'desc' })

    if (!attempts) return []
    return attempts
  } catch (error) {
    throw new Error(error.name)
  }
}

const attemptsProjectCountsAgg = (userId) => (
  Attempt.aggregate()
    .match({ userId })
    .group({
      _id: { project: '$projectId', attempt: '$attemptType' },
      count: { $sum: 1 }
    })
    .group({
      _id: '$_id.project',
      count: { $sum: '$count' },
      attempts: {
        $addToSet: {
          _id: '$_id.attempt',
          count: '$count'
        }
      }
    })
    .lookup({
      from: 'projects',
      localField: '_id',
      foreignField: '_id',
      as: 'projectData'
    })
)

module.exports = {
  attemptsProjectCountsAgg,
  getAllUserAttempts
}