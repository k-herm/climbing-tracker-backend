const { GraphQLList, GraphQLError } = require('graphql')

const { Project: ProjectType } = require('../types/project.type')
const { projectWithGoalsAgg } = require('../../db/queries/project.queries')
const { attemptsProjectCountsAgg } = require('../../db/queries/attempt.queries')
const { sortArrayOfObjectsByGrade } = require('../../db/queries/utils')

const projects = {
  type: new GraphQLList(ProjectType),
  resolve: async (src, args, ctx, info) => {
    try {
      const projects = await projectWithGoalsAgg(ctx.userId)
      const attempts = await attemptsProjectCountsAgg(ctx.userId)

      projects.forEach(project => {
        if (project.goals.length) {
          sortArrayOfObjectsByGrade(project.goals, 'grade')
        }
        const attemptData = attempts.find(attempt => attempt._id.toString() === project._id.toString())
        if (attemptData) {
          project.attempts = attemptData.attempts.map(attemptType => {
            const send = attemptType.send.find(bool => bool._id === true)
            return {
              attemptType: attemptType._id,
              count: attemptType.count,
              sendCount: send ? send.count : 0
            }
          })
        } else {
          project.attempts = []
        }
      })
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