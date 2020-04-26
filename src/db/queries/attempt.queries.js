const Attempt = require('../models/attempt.model')

const getAllUserAttempts = async (userId, filters = {}) => {
  try {
    const attempts = await Attempt.find({ userId, ...filters })
      .sort({ date: 'asc' })

    if (!attempts) return []
    return attempts
  } catch (error) {
    throw new Error(error.name)
  }
}

const attemptsToProjectsAgg = (userId, project = {}, filter = {}) => (
  Attempt.aggregate()
    .match({ userId })
    .lookup({
      from: 'projects',
      localField: 'projectId',
      foreignField: '_id',
      as: 'projects'
    })
    .replaceRoot({
      $mergeObjects: [{ $arrayElemAt: ['$projects', 0] }, '$$ROOT']
    })
    .match({ ...filter })
    .sort({ date: 'asc' })
    .project({ ...project })
)


const attemptsProjectCountsAgg = (userId) => (
  Attempt.aggregate()
    .match({ userId })
    .group({
      _id: { projectId: '$projectId', attempt: '$attemptType', send: '$send' },
      count: { $sum: 1 }
    })
    .group({
      _id: { projectId: '$_id.projectId', attempt: '$_id.attempt' },
      count: { $sum: '$count' },
      send: {
        $addToSet: {
          _id: '$_id.send',
          count: '$count'
        }
      }
    })
    .group({
      _id: '$_id.projectId',
      count: { $sum: '$count' },
      attempts: {
        $addToSet: {
          _id: '$_id.attempt',
          count: '$count',
          send: '$send'
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
  attemptsToProjectsAgg,
  getAllUserAttempts
}