const { GraphQLString, GraphQLNonNull, GraphQLError } = require('graphql')
const { User: UserType } = require('../types/user.type')
const User = require('../../db/models/user.model')

const createUser = {
   type: UserType,
   args: {
      name: {
         type: new GraphQLNonNull(GraphQLString),
         description: 'User name'
      },
      email: {
         type: new GraphQLNonNull(GraphQLString),
         description: 'User email'
      },
      password: {
         type: new GraphQLNonNull(GraphQLString),
         description: 'User password'
      }
   },
   resolve: async (src, { name, email, password }, ctx, info) => {
      const user = new User({ name, email, password })
      try {
         await user.save()
         return {
            id: user._id,
            name: user.name,
            email: user.email
         }
      } catch (error) {
         return new GraphQLError(`${error}`)
      }
   }
}

module.exports = {
   createUser
}