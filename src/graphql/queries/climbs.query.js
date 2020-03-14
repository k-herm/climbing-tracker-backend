const { GraphQLList, GraphQLError } = require('graphql')

const { Climb: ClimbType } = require('../types/climb.type')
const { getAllUserClimbs } = require('../../db/queries/climb.queries')

const climbs = {
  type: new GraphQLList(ClimbType),
  resolve: async (src, args, ctx, info) => {
    try {
      const climbs = await getAllUserClimbs(ctx.userId)
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