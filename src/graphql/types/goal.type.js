const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

const { GradeEnum } = require('./enums.type')

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
      type: new GraphQLNonNull(GradeEnum)
    },
    numberClimbsToComplete: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    climbsCompleted: {
      type: new GraphQLNonNull(new GraphQLList(Climb))
    },
    isCustom: {
      type: GraphQLBoolean
    }
  })
})

const Climb = new GraphQLObjectType({
  name: 'GoalClimb',
  description: 'Climbs accomplished for goal',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    completedDate: {
      type: GraphQLDate
    }
  })
})

module.exports = { Goal }