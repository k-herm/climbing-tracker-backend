const { GraphQLObjectType } = require('graphql')

const { signin } = require('./queries/signin.query')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      signin
   })
})

module.exports = rootQuery