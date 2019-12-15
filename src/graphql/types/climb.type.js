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
  Grade: GradeType,
  RouteStyle: RouteStyleType,
  Attempt: AttemptType
} = require('./enums.type')

const Climb = new GraphQLObjectType({
  name: 'Climb',
  description: 'Climb information',
  fields: () => ({
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    location: {
      type: GraphQLString
    },
    completedDate: {
      type: GraphQLDate
    },
    grade: {
      type: new GraphQLNonNull(GradeType)
    },
    pitches: {
      type: new GraphQLList(Pitch)
    },
    routeStyle: {
      type: new GraphQLList(RouteStyleType)
    },
    attempt: {
      type: AttemptType
    },
    send: {
      type: GraphQLBoolean
    },
    indoor: {
      type: GraphQLBoolean
    }
  })
})



const Pitch = new GraphQLObjectType({
  name: 'Pitch',
  description: 'Pitch information: grade, number',
  fields: () => ({
    grade: {
      type: GradeType,
      description: 'Grade / difficulty'
    },
    number: {
      type: GraphQLInt,
      description: 'Number of pitches'
    }
  })

})

module.exports = { Climb }