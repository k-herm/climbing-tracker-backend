const { GraphQLObjectType } = require('graphql')

const { climbs } = require('./queries/climbs.query')
const { journalEntries } = require('./queries/journalEntries.query')
const { projects } = require('./queries/projects.query')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      climbs,
      journalEntries,
      projects
   })
})

module.exports = rootQuery