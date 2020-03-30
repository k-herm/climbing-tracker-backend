const {
  GraphQLError,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')


const { Goal: GoalType } = require('../types/goal.type')
const Goal = require('../../db/models/goal.model')
const { GradeEnum, ClimbStyleEnum } = require('../types/enums.type')

const addGoal = {
  type: GoalType,
  args: {
    projectId: {
      type: GraphQLID,
      description: 'Associated project id'
    },
    grade: {
      type: new GraphQLNonNull(GradeEnum),
      description: 'Difficulty'
    },
    climbsToComplete: {
      type: GraphQLInt,
      description: 'Number of goal climbs of the specified grade'
    },
    climbStyle: {
      type: ClimbStyleEnum,
      description: 'Style of climbing'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const goal = new Goal({
        ...args,
        userId: ctx.userId
      })
      goal.save()
      return goal
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  addGoal
}