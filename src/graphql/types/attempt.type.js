const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

const { AttemptEnum } = require('./enums.type')

const Attempt = new GraphQLObjectType({
  name: 'Attempt',
  description: 'Attempt information',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    projectId: {
      type: GraphQLID
    },
    date: {
      type: GraphQLDate
    },
    attemptType: {
      type: new GraphQLNonNull(AttemptEnum)
    },
    send: {
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  })
})

module.exports = { Attempt }