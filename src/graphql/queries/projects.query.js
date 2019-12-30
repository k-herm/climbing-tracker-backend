const { GraphQLList, GraphQLError } = require('graphql')

const { Project: ProjectType } = require('../types/project.type')
const Project = require('../../db/models/project.model')

const projects = {
  type: new GraphQLList(ProjectType),
  resolve: async (src, args, ctx, info) => {
    try {
      const projects = await Project.find({ userId: ctx.userId })
        .sort({ completedDate: 'desc' })

      if (!projects) return []
      return projects
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  projects
}