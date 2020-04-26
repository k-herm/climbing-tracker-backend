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

const totalVerticalClimbsAgg = (userId) => (
  Climb.aggregate()
    .match({ userId })
    .group({
      _id: null,
      totalLengthSum: { $sum: '$totalLength' }
    })
)

// does not filter for future years
const totalDaysClimbsAgg = (userId, thisYear) => (
  Climb.aggregate()
    .match({
      userId,
      completedDate: { $gte: thisYear }
    })
    .group({
      _id: { day: { $dayOfYear: '$completedDate' } },
    })
    .group({
      _id: null,
      totalDaysSum: { $sum: 1 }
    })
)
// does not filter for future years
const totalPitchesClimbsAgg = (userId, thisMonth) => (
  Climb.aggregate()
    .match({
      userId,
      completedDate: { $gte: thisMonth }
    })
    .addFields({
      pitches: [{ 'k': 'numberPitches', 'v': '$pitches.numberPitches' }]
    })
    .addFields({
      pitches: { $arrayToObject: '$pitches' }
    })
    .project({
      _id: 0,
      totalNumberPitches: {
        $reduce: {
          input: '$pitches.numberPitches',
          initialValue: 0,
          in: {
            $add: ['$$value', '$$this']
          }
        }
      }
    })
    .group({
      _id: null,
      totalPitchesSum: { $sum: '$totalNumberPitches' }
    })
)

const getClimbsAgg = (userId, project = {}, filter = {}) => (
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
  totalVerticalClimbsAgg,
  totalDaysClimbsAgg,
  totalPitchesClimbsAgg
}