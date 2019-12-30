const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')
const {
  GradeEnum,
  RouteStyleEnum,
} = require('./enums.type')
const { Pitch } = require('./climb.type')

const Project = new GraphQLObjectType({
  name: 'Project',
  description: 'Project information',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    location: {
      type: GraphQLString
    },
    completedDate: {
      type: GraphQLDate
    },
    grade: {
      type: new GraphQLNonNull(GradeEnum)
    },
    pitches: {
      type: new GraphQLNonNull(new GraphQLList(Pitch))
    },
    totalLength: {
      type: GraphQLInt
    },
    routeStyle: {
      type: new GraphQLList(RouteStyleEnum)
    }
  })
})

module.exports = { Project }