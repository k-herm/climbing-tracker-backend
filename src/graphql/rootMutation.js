const { GraphQLObjectType } = require('graphql')

const { addClimb } = require('./mutations/addClimb.mutation')
const { addJournalEntry } = require('./mutations/addJournalEntry.mutation')

const rootMutation = new GraphQLObjectType({
   name: 'RootMutation',
   fields: () => ({
      addClimb,
      addJournalEntry
   })
})

module.exports = rootMutation