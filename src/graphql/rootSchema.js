const { GraphQLSchema } = require('graphql')
const rootQuery = require('./rootQuery')
const rootMutation = require('./rootMutation')

const rootSchema = new GraphQLSchema({
   query: rootQuery,
   mutation: rootMutation
})

module.exports = rootSchema