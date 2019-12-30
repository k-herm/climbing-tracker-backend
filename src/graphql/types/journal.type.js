const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

const Journal = new GraphQLObjectType({
  name: 'Journal',
  description: 'Journal Entry',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    climbId: {
      type: GraphQLID
    },
    projectId: {
      type: GraphQLID
    },
    location: {
      type: GraphQLString
    },
    date: {
      type: GraphQLDate,
    },
    comment: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})

module.exports = { Journal }