const { GraphQLObjectType } = require('graphql')

const { climbs } = require('./queries/climbs.query')
const { journalEntries } = require('./queries/journalEntries.query')
const { projects } = require('./queries/projects.query')
const { attempts } = require('./queries/attempts.query')
const { numericStats } = require('./queries/numericStats.query')
const { gradesChart } = require('./queries/gradesChart.query')
const { goals } = require('./queries/goals.query')
const { climbStyleChart } = require('./queries/climbStyleChart.query')

const rootQuery = new GraphQLObjectType({
   name: 'RootQuery',
   fields: () => ({
      climbs,
      journalEntries,
      projects,
      attempts,
      goals,
      numericStats,
      gradesChart,
      climbStyleChart,
   })
})

module.exports = rootQuery