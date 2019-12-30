const {
  GraphQLList,
  GraphQLError,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')

const { Attempt: AttemptType } = require('../types/attempt.type')
const Attempt = require('../../db/models/attempt.model')

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
      const attempts = await Attempt.find({
        userId: ctx.userId,
        projectId: args.projectId
      }).sort({ date: 'desc' })

      if (!attempts) return []
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