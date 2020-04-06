const { GraphQLError } = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

const { Stats: StatType } = require('../types/stats.type')
const {
  getNumericStatistics,
  getGradesChart,
  getClimbStyleChart
} = require('../../db/queries/stat.queries')
const { getUserData } = require('../../db/queries/user.queries')

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
      const { projects, climbs, attempts } = await getUserData(ctx.userId)
      const {
        totalVertical,
        highestRedpointGrade,
        totalDaysThisYear,
        pitchesThisMonth
      } = getNumericStatistics(climbs, projects, attempts, date)
      const gradesChart = await getGradesChart(ctx.userId)
      const climbStyleChart = await getClimbStyleChart(ctx.userId)

      return {
        userId: ctx.userId,
        numericStatistics: {
          totalVertical,
          highestRedpointGrade,
          totalDaysThisYear,
          pitchesThisMonth
        },
        chartData: {
          gradesChart,
          climbStyleChart
        }
      }
    } catch (error) {
      console.log(error.message)
      return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  stats
}