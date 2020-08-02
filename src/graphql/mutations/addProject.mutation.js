const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLError,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')
const { PitchInput: PitchType } = require('../types/climb.type')
const { Project: ProjectType } = require('../types/project.type')
const { RouteStyleEnum, GradeEnum, ClimbStyleEnum } = require('../types/enums.type')
const Project = require('../../db/models/project.model')

const addProject = {
  type: ProjectType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of Project'
    },
    location: {
      type: GraphQLString,
      description: 'Town or area'
    },
    completedDate: {
      type: GraphQLDate,
      description: 'Date completed'
    },
    grade: {
      type: new GraphQLNonNull(GradeEnum),
      description: 'Overall rated difficulty of Project'
    },
    pitches: {
      type: new GraphQLNonNull(new GraphQLList(PitchType)),
      description: 'List of number of pitches for each grade (multi or single)'
    },
    totalLength: {
      type: GraphQLInt,
      description: 'Total length of project'
    },
    routeStyle: {
      type: new GraphQLList(RouteStyleEnum),
      description: 'List of projecting styles'
    },
    climbStyle: {
      type: ClimbStyleEnum,
      description: 'Style of climbing'
    },
    isArchived: {
      type: GraphQLBoolean,
      description: 'is archived'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const project = new Project({
        ...args,
        userId: ctx.userId
      })
      project.save()
      return project
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  addProject
}