const { GraphQLList, GraphQLError } = require('graphql')

const { Journal: JournalType } = require('../types/journal.type')
const Journal = require('../../db/models/journal.model')

const journalEntries = {
  type: new GraphQLList(JournalType),
  resolve: async (src, args, ctx, info) => {
    try {
      const journals = await Journal.find({ userId: ctx.userId })
        .sort({ completedDate: 'desc' })

      if (!journals) return []
      return journals
    } catch (error) {
      if (error.message)
        return new GraphQLError(error.message)
    }
  }
}

module.exports = {
  journalEntries
}