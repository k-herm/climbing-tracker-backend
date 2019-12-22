const { GraphQLObjectType } = require('graphql')

const { createUser } = require('./mutations/signup.mutation')

const rootMutation = new GraphQLObjectType({
   name: 'RootMutation',
   fields: () => ({
      createUser
   })
})

module.exports = rootMutation