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

const totalVerticalAttemptsAgg = (userId) => (
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
    .group({
      _id: null,
      totalLengthSum: { $sum: '$totalLength' }
    })
)

// does not filter for future years
const totalDaysAttemptsAgg = (userId, thisYear) => (
  Attempt.aggregate()
    .match({
      userId,
      date: { $gte: thisYear }
    })
    .group({
      _id: { day: { $dayOfYear: '$date' } },
    })
    .group({
      _id: null,
      totalDaysSum: { $sum: 1 }
    })
)

// does not filter for future years
const totalPitchesAttemptsAgg = (userId, thisMonth) => (
  Attempt.aggregate()
    .match({
      userId,
      date: { $gte: thisMonth }
    })
    .lookup({
      from: 'projects',
      localField: 'projectId',
      foreignField: '_id',
      as: 'projects'
    })
    .replaceRoot({
      $mergeObjects: [{ $arrayElemAt: ['$projects', 0] }, '$$ROOT']
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
  getAllUserAttempts,
  totalDaysAttemptsAgg,
  totalPitchesAttemptsAgg,
  totalVerticalAttemptsAgg
}