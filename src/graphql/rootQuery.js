const { GraphQLObjectType } = require('graphql')

const { addClimb } = require('./mutations/addClimb.mutation')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      //delete
      addClimb
   })
})

module.exports = rootQuery