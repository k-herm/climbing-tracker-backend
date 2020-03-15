const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')
const {
  GradeEnum,
  RouteStyleEnum,
  AttemptEnum,
  ClimbStyleEnum
} = require('./enums.type')

const Stats = new GraphQLObjectType({
  name: 'Stats',
  description: 'StatData',
  fields: () => ({
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    numericStatistics: {
      type: NumericStatistics
    },
    chartData: {
      type: ChartData
    }
  })
})

const NumericStatistics = new GraphQLObjectType({
  name: 'NumericStatistics',
  description: 'Totals',
  fields: () => ({
    totalVertical: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Total metres climbed'
    },
    highestRedpointGrade: {
      type: new GraphQLNonNull(GradeEnum),
      description: 'Highest grade completed'
    },
    totalDaysThisYear: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Total count'
    },
    pitchesThisMonth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Total count'
    }
  })
})

const ChartData = new GraphQLObjectType({
  name: 'ChartData',
  fields: () => ({
    gradesChart: {
      type: new GraphQLNonNull(GraphQLList(DataValues))
    },
    climbStyleChart: {
      type: new GraphQLNonNull(GraphQLList(DataValues))
    }
  })
})

const DataValues = new GraphQLObjectType({
  name: 'DataValues',
  fields: () => ({
    attemptType: {
      type: AttemptEnum
    },
    routeStyle: {
      type: RouteStyleEnum
    },
    climbStyle: {
      type: ClimbStyleEnum
    },
    grade: {
      type: GradeEnum
    },
    count: {
      type: GraphQLInt
    },
    location: {
      type: GraphQLString
    },
    date: {
      type: GraphQLDate
    },
    send: {
      type: GraphQLBoolean
    },
    indoor: {
      type: GraphQLBoolean
    }
  })
})

module.exports = { Stats }