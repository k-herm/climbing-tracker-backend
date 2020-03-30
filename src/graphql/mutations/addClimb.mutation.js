const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLError,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')
const { Climb: ClimbType, PitchInput: PitchType } = require('../types/climb.type')
const {
  AttemptEnum,
  RouteStyleEnum,
  GradeEnum,
  ClimbStyleEnum
} = require('../types/enums.type')
const Climb = require('../../db/models/climb.model')


const addClimb = {
  type: ClimbType,
  args: {
    name: {
      type: GraphQLString,
      description: 'Name of climb'
    },
    location: {
      type: GraphQLString,
      description: 'Town or area'
    },
    completedDate: {
      type: GraphQLDate,
      description: 'Date completed'
    },
    grade: {
      type: new GraphQLNonNull(GradeEnum),
      description: 'Overall rated difficulty of climb'
    },
    pitches: {
      type: new GraphQLNonNull(new GraphQLList(PitchType)),
      description: 'List of number of pitches for each grade (multi or single)'
    },
    totalLength: {
      type: GraphQLInt,
      description: 'Total length of climb'
    },
    routeStyle: {
      type: new GraphQLList(RouteStyleEnum),
      description: 'List of climbing styles'
    },
    climbStyle: {
      type: new GraphQLNonNull(ClimbStyleEnum),
      description: 'Style of climbing'
    },
    attempt: {
      type: new GraphQLNonNull(AttemptEnum),
      description: 'Type of send'
    },
    send: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Successful completion of attempt type'
    },
    indoor: {
      type: GraphQLBoolean,
      description: 'Indoor or outdoor'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const climb = new Climb({
        ...args,
        userId: ctx.userId
      })
      climb.save()
      return climb
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  addClimb
}