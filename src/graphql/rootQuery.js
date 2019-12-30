const { GraphQLObjectType } = require('graphql')

const { climbs } = require('./queries/climbs.query')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      climbs
   })
})

module.exports = rootQuery