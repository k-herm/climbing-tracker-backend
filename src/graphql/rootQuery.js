const { GraphQLObjectType } = require('graphql')

const { climbs } = require('./queries/climbs.query')
const { journalEntries } = require('./queries/journalEntries.query')
const { projects } = require('./queries/projects.query')
const { attempts } = require('./queries/attempts.query')
const { numericStats } = require('./queries/numericStats.query')
const { charts } = require('./queries/charts.query')
const { goals } = require('./queries/goals.query')
const { chartsStyleFilter } = require('./queries/chartsStyleFilter')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      climbs,
      journalEntries,
      projects,
      attempts,
      goals,
      numericStats,
      charts,
      chartsStyleFilter,
   })
})

module.exports = rootQuery