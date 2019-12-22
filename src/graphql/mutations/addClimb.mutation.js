const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLError,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} = require('graphql')
const { Climb: ClimbType } = require('../types/climb.type')


const addClimb = {
  type: ClimbType,
  args: {

  }
}