const { GraphQLObjectType } = require('graphql')

const { addClimb } = require('./mutations/addClimb.mutation')
const { addJournalEntry } = require('./mutations/addJournalEntry.mutation')
const { addProject } = require('./mutations/addProject.mutation')
const { addAttempt } = require('./mutations/addAttempt.mutation')
const { addGoal } = require('./mutations/addGoal.mutation')
const { editGoal } = require('./mutations/editGoal.mutation')

const rootMutation = new GraphQLObjectType({
   name: 'RootMutation',
   fields: () => ({
      addClimb,
      addJournalEntry,
      addProject,
      addAttempt,
      addGoal,
      editGoal
   })
})

module.exports = rootMutation