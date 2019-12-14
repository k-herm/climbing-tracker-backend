const { GraphQLObjectType } = require('graphql')

const { userQuery } = require('../graphql/queries/user.query')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      userQuery
   })
})

module.exports = rootQuery