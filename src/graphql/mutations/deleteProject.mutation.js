const { GraphQLError, GraphQLID, GraphQLNonNull } = require('graphql')

const { Project: ProjectType } = require('../types/project.type')
const Project = require('../../db/models/project.model')

const deleteProject = {
  type: ProjectType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Project ID'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      await Project.deleteOne({ _id: args.id })
      return { _id: args.id }
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  deleteProject
}