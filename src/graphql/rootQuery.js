const { GraphQLObjectType } = require('graphql')

const { climbs } = require('./queries/climbs.query')
const { journalEntries } = require('./queries/journalEntries.query')
const { projects } = require('./queries/projects.query')
const { attempts } = require('./queries/attempts.query')
const { stats } = require('./queries/stats.query')
const { goals } = require('./queries/goals.query')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      climbs,
      journalEntries,
      projects,
      attempts,
      stats,
      goals
   })
})

module.exports = rootQuery