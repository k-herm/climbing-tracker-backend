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
      type: GradeEnum,
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
    // climbStyleChart: {
    //   type: new GraphQLNonNull(GraphQLList(DataValues))
    // }
  })
})

const DataValues = new GraphQLObjectType({
  name: 'DataValues',
  fields: () => ({
    attempts: {
      type: new GraphQLList(AttemptValues)
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
    sends: {
      type: GraphQLInt
    },
    indoor: {
      type: GraphQLBoolean
    }
  })
})

const AttemptValues = new GraphQLObjectType({
  name: 'AttemptTypes',
  fields: () => ({
    attemptType: {
      type: new GraphQLNonNull(AttemptEnum)
    },
    count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    sendCount: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
})

module.exports = { Stats }