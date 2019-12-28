const { GraphQLObjectType } = require('graphql')

const rootMutation = new GraphQLObjectType({
   name: 'RootMutation',
   fields: () => ({
      // createUser
   })
})

module.exports = rootMutation