const {
  GraphQLBoolean,
  GraphQLError,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

const { Attempt: AttemptType } = require('../types/attempt.type')
const Attempt = require('../../db/models/attempt.model')
const { AttemptEnum } = require('../types/enums.type')

const addAttempt = {
  type: AttemptType,
  args: {
    projectId: {
      type: GraphQLID,
      description: 'Project Id'
    },
    date: {
      type: GraphQLDate,
      description: 'Date attempted'
    },
    attemptType: {
      type: new GraphQLNonNull(AttemptEnum),
      description: 'Style of attempt'
    },
    send: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'climb without takes or falls'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const attempt = new Attempt({
        ...args,
        userId: ctx.userId
      })
      attempt.save()
      return attempt
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  addAttempt
}