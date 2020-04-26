const {
  GraphQLList,
  GraphQLError,
  GraphQLID
} = require('graphql')

const { Goal: GoalType } = require('../types/goal.type')
const { getAllUserGoals } = require('../../db/queries/goal.queries')
const { GradeEnum, ClimbStyleEnum } = require('../types/enums.type')

const goals = {
  type: new GraphQLList(GoalType),
  args: {
    projectId: {
      type: GraphQLID,
      description: 'Project Id'
    },
    grade: {
      type: GradeEnum,
      description: 'Difficulty'
    },
    climbStyle: {
      type: ClimbStyleEnum,
      description: 'Climb Style'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const filters = {}
      if (args.projectId) { filters.projectId = args.projectId }
      if (args.grade) { filters.grade = args.grade }
      if (args.climbStyle) { filters.climbStyle = args.climbStyle }
      const goals = await getAllUserGoals(ctx.userId, { ...filters })
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