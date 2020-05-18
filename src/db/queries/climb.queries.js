const Climb = require('../models/climb.model')

const getAllUserClimbs = async (userId, filter = {}) => {
  try {
    const climbs = await Climb.find({ userId, ...filter })
      .sort({ completedDate: 'asc' })

    if (!climbs) return []
    return climbs
  } catch (error) {
    throw new Error(error.name)
  }
}

const getNumClimbs = async (userId, limit, filter = {}, sort = {}) => {
  try {
    const climbs = await Climb.find({ userId, ...filter })
      .sort({ ...sort })
      .limit(limit)

    if (!climbs) return []
    return climbs
  } catch (error) {
    throw new Error(error.name)
  }
}

const getClimbsAgg = async (userId, project = {}, filter = {}) => (
  Climb.aggregate()
    .match({ userId })
    .match({ ...filter })
    .sort({ completedDate: 'asc' })
    .project({ ...project })
)

const climbsGradeAttemptCountsAgg = (userId) => (
  Climb.aggregate()
    .match({ userId })
    .group({
      _id: { grade: '$grade', attempt: '$attempt', send: '$send' },
      count: { $sum: 1 }
    })
    .group({
      _id: { grade: '$_id.grade', attempt: '$_id.attempt' },
      count: { $sum: '$count' },
      send: {
        $addToSet: {
          _id: '$_id.send',
          count: '$count'
        }
      }
    })
    .group({
      _id: '$_id.grade',
      count: { $sum: '$count' },
      attempts: {
        $addToSet: {
          _id: '$_id.attempt',
          count: '$count',
          send: '$send'
        }
      }
    })
)

module.exports = {
  climbsGradeAttemptCountsAgg,
  getAllUserClimbs,
  getClimbsAgg,
  getNumClimbs
}