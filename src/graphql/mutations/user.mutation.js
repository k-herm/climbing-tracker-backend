const { GraphQLString, GraphQLNonNull, GraphQLError } = require('graphql')
const bcrypt = require('bcryptjs')

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
      },
      passwordConfirm: {
         type: new GraphQLNonNull(GraphQLString),
         description: 'Confirm password'
      }
   },
   resolve: async (src, args, ctx, info) => {
      const { name, email, password, passwordConfirm } = args
      if (password !== passwordConfirm) {
         return new GraphQLError('Passwords do not match.')
      }
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({ name, email, password: hashPassword })
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