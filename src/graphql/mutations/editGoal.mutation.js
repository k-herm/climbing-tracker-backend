const {
  GraphQLError,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql')

const { Goal: GoalType, ClimbInput: ClimbType } = require('../types/goal.type')
const Goal = require('../../db/models/goal.model')
const { GradeEnum, ClimbStyleEnum } = require('../types/enums.type')

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
      type: GraphQLInt,
      description: 'Number of goal climbs of the specified grade'
    },
    climbsCompleted: {
      type: new GraphQLNonNull(new GraphQLList(ClimbType)),
      description: 'Name and date of climb completed towards goal'
    },
    climbStyle: {
      type: ClimbStyleEnum,
      description: 'Style of climbing'
    }
  },
  resolve: async (src, args, ctx, info) => {
    const updateParams = {}
    if (args.projectId) updateParams[projectId] = args.projectId
    if (args.grade) updateParams[grade] = args.grade
    if (args.numberClimbsToComplete) updateParams[numberClimbsToComplete] = args.numberClimbsToComplete
    if (args.climbsCompleted) updateParams[climbsCompleted] = args.climbsCompleted
    if (args.climbStyle) updateParams[args.climbStyle] = args.climbStyle
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