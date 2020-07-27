const {
  GraphQLList,
  GraphQLString,
  GraphQLError,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} = require('graphql')
const { ClimbStyleEnum, GradeEnum, RouteStyleEnum } = require('../types/enums.type')
const { Pitch } = require('../types/climb.type')

const { Project: ProjectType } = require('../types/project.type')
const Project = require('../../db/models/project.model')

const { getNumClimbs } = require('../../db/queries/climb.queries')

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
    grade: {
      type: GradeEnum,
      description: 'Difficulty'
    },
    pitches: {
      type: new GraphQLList(Pitch)
    },
    totalLength: {
      type: GraphQLInt,
      description: 'Total length of the climb'
    },
    routeStyle: {
      type: RouteStyleEnum,
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
    if (args.grade) { updateParams.grade = args.grade }
    if (args.pitches) { updateParams.pitches = args.pitches }
    if (args.totalLength) { updateParams.totalLength = args.totalLength }
    if (args.routeStyle) { updateParams.routeStyle = args.routeStyle }
    if (args.climbStyle) { updateParams.climbStyle = args.climbStyle }
    if (args.isArchived) { updateParams.climbStyle = args.isArchived }

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