const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

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
    numberClimbsToComplete: {
      type: GraphQLInt,
    },
    climbsCompleted: {
      type: new GraphQLNonNull(new GraphQLList(Climb))
    },
    climbStyle: {
      type: ClimbStyleEnum
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

const ClimbInput = new GraphQLInputObjectType({
  name: 'GoalClimbInput',
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

module.exports = { Goal, Climb, ClimbInput }