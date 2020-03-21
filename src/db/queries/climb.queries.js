const Climb = require('../models/climb.model')

const getAllUserClimbs = async (userId) => {
  try {
    const climbs = await Climb.find({ userId })
      .sort({ completedDate: 'desc' })

    if (!climbs) return []
    return climbs
  } catch (error) {
    throw new Error(error.name)
  }
}

const climbsGradeAttemptCountsAgg = (userId) => (
  Climb.aggregate()
    .match({ userId, send: true })
    .group({
      _id: { grade: '$grade', attempt: '$attempt' },
      count: { $sum: 1 }
    })
    .group({
      _id: '$_id.grade',
      count: { $sum: '$count' },
      attempts: {
        $addToSet: {
          _id: '$_id.attempt',
          count: '$count'
        }
      }
    })
)

module.exports = {
  climbsGradeAttemptCountsAgg,
  getAllUserClimbs
}