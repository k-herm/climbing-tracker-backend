const { GraphQLList, GraphQLError } = require('graphql')

const { Climb: ClimbType } = require('../types/climb.type')
const Climb = require('../../db/models/climb.model')

const climbs = {
  type: new GraphQLList(ClimbType),
  resolve: async (src, args, ctx, info) => {
    try {
      const climbs = await Climb.find({ userId: ctx.userId })
        .sort({ completedDate: 'desc' })

      if (!climbs) return []
      return climbs
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  climbs
}