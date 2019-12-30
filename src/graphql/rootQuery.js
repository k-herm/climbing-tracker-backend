const { GraphQLObjectType } = require('graphql')

const { climbs } = require('./queries/climbs.query')
const { journalEntries } = require('./queries/journalEntries.query')
const { projects } = require('./queries/projects.query')
const { attempts } = require('./queries/attempts.query')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      climbs,
      journalEntries,
      projects,
      attempts
   })
})

module.exports = rootQuery