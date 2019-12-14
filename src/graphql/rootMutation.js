const { GraphQLObjectType } = require('graphql')

const { createUser } = require('./mutations/user.mutation')

const rootMutation = new GraphQLObjectType({
   name: 'RootMutation',
   fields: () => ({
      createUser
   })
})

module.exports = rootMutation