const { GraphQLError, GraphQLID, GraphQLNonNull } = require('graphql')

const { Goal: GoalType } = require('../types/goal.type')
const Goal = require('../../db/models/goal.model')

const deleteGoal = {
  type: GoalType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Goal ID'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      await Goal.deleteOne({ _id: args.id })
      return { _id: args.id }
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  deleteGoal
}