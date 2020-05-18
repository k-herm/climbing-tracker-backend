const {
  GraphQLBoolean,
  GraphQLList,
  GraphQLError,
  GraphQLID
} = require('graphql')

const { Attempt: AttemptType } = require('../types/attempt.type')
const { getAllUserAttempts } = require('../../db/queries/attempt.queries')
const { AttemptEnum } = require('../types/enums.type')

const attempts = {
  type: new GraphQLList(AttemptType),
  args: {
    projectId: {
      type: GraphQLID,
      description: 'Project Id'
    },
    attemptType: {
      type: AttemptEnum,
      description: 'type of attempt'
    },
    send: {
      type: GraphQLBoolean,
      description: 'climb without falls or takes'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const filters = {}
      if (args.projectId) { filters.projectId = args.projectId }
      if (args.attemptType) { filters.attemptType = args.attemptType }
      if (args.send) { filters.send = args.send }
      const attempts = await getAllUserAttempts(ctx.userId, { ...filters })
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