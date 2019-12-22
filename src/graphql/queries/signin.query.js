const { GraphQLString, GraphQLNonNull, GraphQLError } = require('graphql')
const { signin: signinUser } = require('../../db/queries/user.queries')
const { User: UserType } = require('../types/user.type')

const signin = {
  type: UserType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User email'
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User password'
    },
  },
  resolve: async (src, { email, password }, ctx, info) => {
    const user = await signinUser(email, password)
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
  signin
}