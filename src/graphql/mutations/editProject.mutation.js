const {
  GraphQLList,
  GraphQLString,
  GraphQLError,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')
const { ClimbStyleEnum, GradeEnum, RouteStyleEnum } = require('../types/enums.type')
const { PitchInput: PitchType } = require('../types/climb.type')

const { Project: ProjectType } = require('../types/project.type')
const Project = require('../../db/models/project.model')

const editProject = {
  type: ProjectType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Project ID'
    },
    name: {
      type: GraphQLString,
      description: 'Project name'
    },
    location: {
      type: GraphQLString,
      description: 'Project location'
    },
    completedDate: {
      type: GraphQLDate,
      description: 'Completed Date'
    },
    grade: {
      type: GradeEnum,
      description: 'Difficulty'
    },
    pitches: {
      type: new GraphQLList(PitchType)
    },
    totalLength: {
      type: GraphQLInt,
      description: 'Total length of the climb'
    },
    routeStyle: {
      type: new GraphQLList(RouteStyleEnum),
      description: 'Type of climbing: sport or trad'
    },
    climbStyle: {
      type: ClimbStyleEnum,
      description: 'Climb Style'
    },
    isArchived: {
      type: GraphQLBoolean,
      description: 'archive project'
    },
  },
  resolve: async (src, args, ctx, info) => {
    const updateParams = {}
    if (args.name) { updateParams.name = args.name }
    if (args.location) { updateParams.location = args.location }
    if (args.completedDate) { updateParams.location = args.completedDate }
    if (args.grade) { updateParams.grade = args.grade }
    if (args.pitches) { updateParams.pitches = args.pitches }
    if (args.totalLength) { updateParams.totalLength = args.totalLength }
    if (args.routeStyle) { updateParams.routeStyle = args.routeStyle }
    if (args.climbStyle) { updateParams.climbStyle = args.climbStyle }
    if (args.isArchived) { updateParams.isArchived = args.isArchived }

    try {
      const project = await Project.findByIdAndUpdate(
        args.id,
        { ...updateParams },
        { new: true }
      )

      return project
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  editProject
}