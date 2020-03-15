const { GraphQLError } = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

const { Stats: StatType } = require('../types/stats.type')
const { getAllUserProjects } = require('../../db/queries/project.queries')
const { getAllUserClimbs } = require('../../db/queries/climb.queries')
const { getAllUserAttempts } = require('../../db/queries/attempt.queries')
const {
  getNumericStatistics
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
      const p = getAllUserProjects(ctx.userId)
      const c = getAllUserClimbs(ctx.userId)
      const a = getAllUserAttempts(ctx.userId)
      const results = await Promise.all([p, c, a])

      const projects = results[0]
      const climbs = results[1]
      const attempts = results[2]

      const {
        totalVertical,
        highestRedpointGrade,
        totalDaysThisYear,
        pitchesThisMonth
      } = getNumericStatistics(projects, climbs, attempts, date)
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