const { GraphQLObjectType } = require('graphql')

const { climbs } = require('./queries/climbs.query')
const { journalEntries } = require('./queries/journalEntries.query')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      climbs,
      journalEntries
   })
})

module.exports = rootQuery