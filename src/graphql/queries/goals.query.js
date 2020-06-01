const {
  GraphQLBoolean,
  GraphQLList,
  GraphQLError,
  GraphQLID
} = require('graphql')

const { Goal: GoalType } = require('../types/goal.type')
const { getAllUserGoals } = require('../../db/queries/goal.queries')
const { getNumClimbs } = require('../../db/queries/climb.queries')
const { GradeEnum, ClimbStyleEnum } = require('../types/enums.type')

const goals = {
  type: new GraphQLList(GoalType),
  args: {
    projectId: {
      type: GraphQLID,
      description: 'Project Id'
    },
    climbStyle: {
      type: ClimbStyleEnum,
      description: 'Climb Style'
    },
    grade: {
      type: GradeEnum,
      description: 'Difficulty'
    },
    isCustom: {
      type: GraphQLBoolean,
      description: 'User defined goal'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const filters = {}
      if (args.projectId) { filters.projectId = args.projectId }
      if (args.grade) { filters.grade = args.grade }
      const goals = await getAllUserGoals(ctx.userId, { ...filters })

      await Promise.all(
        goals.map(async goal => {
          // fill in completed climbs by grade with climbs query
          const climbsCompleted = await getNumClimbs(
            ctx.userId,
            goal.numberClimbsToComplete,
            { climbStyle: args.climbStyle },
            { completedDate: 'desc' }
          )
          goal.climbsCompleted = climbsCompleted.map(climb => ({
            name: climb.name || 'Unknown',
            completedDate: climb.completedDate
          }))
        })
      )
      return goals
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  goals
}