const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
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
      type: new GraphQLNonNull(GraphQLID)
    },
    date: {
      type: GraphQLDate
    },
    falls: {
      type: GraphQLInt
    },
    takes: {
      type: GraphQLInt
    },
    attemptType: {
      type: new GraphQLNonNull(AttemptEnum)
    }
  })
})

module.exports = { Attempt }