const { GraphQLError } = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

const { Stats: StatType } = require('../types/stats.type')
const { getAllUserProjects } = require('../../db/queries/project.queries')
const { getAllUserClimbs } = require('../../db/queries/climb.queries')
const { getAllUserAttempts } = require('../../db/queries/attempt.queries')
const {
  getTotalVertical,
  getPitchesThisMonth,
  getTotalDaysThisYear,
  getHighestRedpointGrade
} = require('../../db/queries/stat.queries')


const stats = {
  type: StatType,
  args: {
    date: {
      type: GraphQLDate,
      default: new Date()
    }
  },
  resolve: async (src, { date }, ctx, info) => {
    try {
      const projects = await getAllUserProjects(ctx.userId)
      const climbs = await getAllUserClimbs(ctx.userId)
      const attempts = await getAllUserAttempts(ctx.userId)

      const totalVertical = getTotalVertical(climbs, projects, attempts)
      const pitchesThisMonth = getPitchesThisMonth(climbs, projects, attempts, date)
      const totalDaysThisYear = getTotalDaysThisYear(climbs, projects, attempts, date)
      const highestRedpointGrade = getHighestRedpointGrade(climbs, projects)
      // console.log('projects:', JSON.stringify(projects, null, 2));
      // console.log('climbs:', JSON.stringify(climbs, null, 2));
      // console.log('attempts:', JSON.stringify(attempts, null, 2));

      return {
        userId: ctx.userId,
        numericStatistics: {
          totalVertical,
          highestRedpointGrade,
          totalDaysThisYear,
          pitchesThisMonth
        },
        chartData: {
          gradesChart: [],
          climbStyleChart: []
        }
      }
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  stats
}