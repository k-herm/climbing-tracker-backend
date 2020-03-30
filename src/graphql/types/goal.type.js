const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql')

const { GradeEnum, ClimbStyleEnum } = require('./enums.type')

const Goal = new GraphQLObjectType({
  name: 'Goal',
  description: 'Goal information',
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
    grade: {
      type: GradeEnum
    },
    climbsToComplete: {
      type: GraphQLInt,
    },
    climbStyle: {
      type: ClimbStyleEnum
    }
  })
})

module.exports = { Goal }