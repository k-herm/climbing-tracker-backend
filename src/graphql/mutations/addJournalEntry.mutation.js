const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLError,
  GraphQLID
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')
const { Journal: JournalType } = require('../types/journal.type')
const Journal = require('../../db/models/journal.model')

const addJournalEntry = {
  type: JournalType,
  args: {
    climbId: {
      type: GraphQLID
    },
    projectId: {
      type: GraphQLID
    },
    location: {
      type: GraphQLString,
      description: 'Town or area'
    },
    date: {
      type: GraphQLDate,
      description: 'Date written'
    },
    comment: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Journal entry'
    }
  },
  resolve: async (src, args, ctx, info) => {
    try {
      const journalEntry = new Journal({
        ...args,
        userId: ctx.userId
      })
      journalEntry.save()
      return journalEntry
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  addJournalEntry
}