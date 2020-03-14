const { GraphQLList, GraphQLError } = require('graphql')

const { Project: ProjectType } = require('../types/project.type')
const { getAllUserProjects } = require('../../db/queries/project.queries')

const projects = {
  type: new GraphQLList(ProjectType),
  resolve: async (src, args, ctx, info) => {
    try {
      const projects = await getAllUserProjects(ctx.userId)
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