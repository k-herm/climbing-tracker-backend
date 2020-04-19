const { GraphQLError } = require('graphql')

const { Stats: StatType } = require('../types/stats.type')
const { getGradesChart } = require('../../db/queries/stat.queries')

const gradesChart = {
  type: StatType,
  resolve: async (src, args, ctx, info) => {
    try {
      const { gradesChart, otherData } = await getGradesChart(ctx.userId)
      return {
        userId: ctx.userId,
        chartData: {
          gradesChart: {
            gradesChart,
            otherData
          }
        }
      }
    } catch (error) {
      console.log(error.message)
      return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  gradesChart
}