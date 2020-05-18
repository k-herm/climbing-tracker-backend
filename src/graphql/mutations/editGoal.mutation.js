const {
  GraphQLError,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')

const { Goal: GoalType } = require('../types/goal.type')
const Goal = require('../../db/models/goal.model')
const { GradeEnum } = require('../types/enums.type')

const editGoal = {
  type: GoalType,
  args: {
    id: {
      type: GraphQLID,
      description: 'Goal ID'
    },
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
    }
  },
  resolve: async (src, args, ctx, info) => {
    const updateParams = {}
    if (args.projectId) updateParams[projectId] = args.projectId
    if (args.grade) updateParams[grade] = args.grade
    if (args.numberClimbsToComplete) updateParams[numberClimbsToComplete] = args.numberClimbsToComplete
    try {
      const goal = await Goal.updateOne({ _id: args.id }, { ...updateParams })
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