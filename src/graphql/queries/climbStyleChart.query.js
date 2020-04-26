const { GraphQLError, GraphQLList } = require('graphql')

const { Stats: StatType } = require('../types/stats.type')
const { RouteStyleEnum } = require('../types/enums.type')
const { getClimbStyleChart } = require('../../db/queries/stat.queries')

const climbStyleChart = {
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

      const climbStyleChart = getClimbStyleChart(ctx.userId, filter)

      return {
        userId: ctx.userId,
        climbStyleChart
      }
    } catch (error) {
      console.log(error.message)
      return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  climbStyleChart
}