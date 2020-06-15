const {
  GraphQLError,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')

const { Goal: GoalType } = require('../types/goal.type')
const Goal = require('../../db/models/goal.model')
const { ClimbStyleEnum, GradeEnum } = require('../types/enums.type')
const { getNumClimbs } = require('../../db/queries/climb.queries')

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
    numberClimbsToComplete: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Number of goal climbs of the specified grade'
    },
    isCustom: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'User defined goal'
    },
    climbStyle: {
      type: new GraphQLNonNull(ClimbStyleEnum),
      description: 'Climb Style'
    },
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const climbStyle = args.climbStyle
      delete args.climbStyle
      const goal = new Goal({
        ...args,
        userId: ctx.userId
      })
      goal.save()

      const climbs = await getNumClimbs(
        ctx.userId,
        goal.numberClimbsToComplete,
        { climbStyle },
        { completedDate: 'desc' }
      )

      goal.climbsCompleted = climbs.map(climb => ({
        name: climb.name || 'Unknown',
        completedDate: climb.completedDate
      }))

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