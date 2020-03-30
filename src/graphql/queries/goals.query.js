const {
  GraphQLList,
  GraphQLError,
  GraphQLID
} = require('graphql')

const { Goal: GoalType } = require('../types/goal.type')
const { getAllUserGoals } = require('../../db/queries/goal.queries')

const goals = {
  type: new GraphQLList(GoalType),
  args: {
    projectId: {
      type: GraphQLID,
      description: 'Project Id'
    },
    goalId: {
      type: GraphQLID,
      description: 'Goal Id'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const filters = {}
      if (args.projectId) { filters.projectId = args.projectId }
      if (args.goalId) { filters.goalId = args.goalId }
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