const { GraphQLError, GraphQLList } = require('graphql')

const { Stats: StatType } = require('../types/stats.type')
const { RouteStyleEnum } = require('../types/enums.type')
const { getClimbStyleChart } = require('../../db/queries/stat.queries')
const { getUserData } = require('../../db/queries/user.queries')

const chartsStyleFilter = {
  type: StatType,
  args: {
    routeStyle: {
      type: new GraphQLList(RouteStyleEnum)
    }
  },
  resolve: async (src, { routeStyle }, ctx, info) => {
    try {
      const filter = {}
      if (routeStyle && routeStyle.length) {
        filter.routeStyle = routeStyle
      }
      const { projects, climbs, attempts } = await getUserData(ctx.userId, filter)
      const { climbStyleChart, otherData: stylesOtherData } = getClimbStyleChart(
        climbs,
        projects,
        attempts
      )

      return {
        userId: ctx.userId,
        chartData: {
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
  chartsStyleFilter
}