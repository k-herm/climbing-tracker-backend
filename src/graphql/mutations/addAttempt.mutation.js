const {
  GraphQLError,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

const { Attempt: AttemptType } = require('../types/attempt.type')
const Attempt = require('../../db/models/attempt.model')
const { AttemptEnum } = require('../types/enums.type')

const addAttempt = {
  type: AttemptType,
  args: {
    projectId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Project Id'
    },
    date: {
      type: GraphQLDate,
      description: 'Date attempted'
    },
    falls: {
      type: GraphQLInt,
      description: 'Number of falls'
    },
    takes: {
      type: GraphQLInt,
      description: 'Number of takes'
    },
    attemptType: {
      type: new GraphQLNonNull(AttemptEnum),
      description: 'Style of attempt'
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