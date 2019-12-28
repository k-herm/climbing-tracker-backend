const { GraphQLObjectType } = require('graphql')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      // signin
   })
})

module.exports = rootQuery