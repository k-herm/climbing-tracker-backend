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
  description: 'Stat Data',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
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
  name: 'Numeric Statistics',
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
  name: 'Chart Data',
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
  name: 'Data Values',
  fields: () => ({
    attemptType: AttemptEnum,
    routeStyle: RouteStyleEnum,
    climbStyle: ClimbStyleEnum,
    grade: GradeEnum,
    count: GraphQLInt,
    location: GraphQLString,
    date: GraphQLDate,
    send: GraphQLBoolean,
    indoor: GraphQLBoolean
  })
})

module.exports = { Stats }