const { GraphQLError } = require('graphql')

const { Stats: StatType } = require('../types/stats.type')
const { getGradesChart, getClimbStyleChart } = require('../../db/queries/stat.queries')
const { getUserData } = require('../../db/queries/user.queries')

const charts = {
  type: StatType,
  resolve: async (src, args, ctx, info) => {
    try {
      const { projects, climbs, attempts } = await getUserData(ctx.userId)
      const { gradesChart, otherData } = await getGradesChart(ctx.userId)
      const { climbStyleChart, otherData: stylesOtherData } = getClimbStyleChart(
        climbs,
        projects,
        attempts
      )

      return {
        userId: ctx.userId,
        chartData: {
          gradesChart: {
            gradesChart,
            otherData
          },
          climbStyleChart: {
            climbStyleChart,
            otherData: stylesOtherData
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
  charts
}