const {
  GraphQLObjectType,
  GraphQLInputObjectType,
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

const Climb = new GraphQLObjectType({
  name: 'Climb',
  description: 'Climb information',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
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
    },
    climbStyle: {
      type: new GraphQLNonNull(ClimbStyleEnum)
    },
    attempt: {
      type: new GraphQLNonNull(AttemptEnum)
    },
    send: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    indoor: {
      type: GraphQLBoolean
    }
  })
})



const Pitch = new GraphQLObjectType({
  name: 'Pitch',
  description: 'Pitch information: grade, number of pitches',
  fields: () => ({
    grade: {
      type: GradeEnum,
      description: 'Grade / difficulty'
    },
    numberPitches: {
      type: GraphQLInt,
      description: 'Number of pitches'
    }
  })
})

const PitchInput = new GraphQLInputObjectType({
  name: 'PitchInput',
  fields: () => ({
    grade: {
      type: GradeEnum,
      description: 'Grade / difficulty'
    },
    numberPitches: {
      type: GraphQLInt,
      description: 'Number of pitches'
    }
  })
})

module.exports = { Climb, Pitch, PitchInput }