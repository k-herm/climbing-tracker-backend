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

module.exports = {
  getAllUserClimbs
}