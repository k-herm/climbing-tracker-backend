const {
  GraphQLList,
  GraphQLError,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')

const { Attempt: AttemptType } = require('../types/attempt.type')
const { getAllProjectAttempts } = require('../../db/queries/attempt.queries')

const attempts = {
  type: new GraphQLList(AttemptType),
  args: {
    projectId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Project Id'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const attempts = await getAllProjectAttempts(ctx.userId, args.projectId)
      return attempts
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  attempts
}