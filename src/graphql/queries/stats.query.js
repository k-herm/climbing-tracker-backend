const { GraphQLError } = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

const { Stats: StatType } = require('../types/stats.type')
const {
  getNumericStatistics,
  getChartData,
  getUserData
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
      const { projects, climbs, attempts } = await getUserData(ctx.userId)
      const {
        totalVertical,
        highestRedpointGrade,
        totalDaysThisYear,
        pitchesThisMonth
      } = getNumericStatistics(climbs, projects, attempts, date)
      const { gradesChart } = await getChartData(ctx.userId, projects)

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