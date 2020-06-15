const {
  GraphQLBoolean,
  GraphQLError,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')

const { Goal: GoalType } = require('../types/goal.type')
const Goal = require('../../db/models/goal.model')
const { ClimbStyleEnum, GradeEnum } = require('../types/enums.type')
const { getNumClimbs } = require('../../db/queries/climb.queries')

const editGoal = {
  type: GoalType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Goal ID'
    },
    projectId: {
      type: GraphQLID,
      description: 'Associated project id'
    },
    grade: {
      type: GradeEnum,
      description: 'Difficulty'
    },
    numberClimbsToComplete: {
      type: GraphQLInt,
      description: 'Number of goal climbs of the specified grade'
    },
    isCustom: {
      type: GraphQLBoolean,
      description: 'User defined goal'
    },
    climbStyle: {
      type: new GraphQLNonNull(ClimbStyleEnum),
      description: 'Climb Style'
    },
  },
  resolve: async (src, args, ctx, info) => {
    const updateParams = {}
    if (args.projectId) { updateParams.projectId = args.projectId }
    if (args.grade) { updateParams.grade = args.grade }
    if (args.numberClimbsToComplete) { updateParams.numberClimbsToComplete = args.numberClimbsToComplete }
    if (args.isCustom) { updateParams.isCustom = args.isCustom }

    try {
      const goal = await Goal.findByIdAndUpdate(
        args.id,
        { ...updateParams },
        { new: true }
      )

      const climbs = await getNumClimbs(
        ctx.userId,
        goal.numberClimbsToComplete,
        { climbStyle: args.climbStyle },
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
  editGoal
}