const { GraphQLString, GraphQLNonNull, GraphQLError } = require('graphql')
const { User: UserType } = require('../types/user.type')
const { createUser: signup } = require('../../db/mutations/user.mutations')

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
      },
      passwordConfirm: {
         type: new GraphQLNonNull(GraphQLString),
         description: 'Confirm password'
      }
   },
   resolve: async (src, args, ctx, info) => {
      const { name, email, password, passwordConfirm } = args
      const user = await signup(name, email, password, passwordConfirm)
      if (user.message) {
         return new GraphQLError(user.message)
      }
      return {
         id: user._id,
         name: user.name,
         email: user.email
      }
   }
}

module.exports = {
   createUser
}