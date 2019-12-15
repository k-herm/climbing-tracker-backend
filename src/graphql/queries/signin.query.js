const { GraphQLString, GraphQLNonNull, GraphQLError } = require('graphql')
const bcrypt = require('bcryptjs')

const { User: UserType } = require('../types/user.type')
const User = require('../../db/models/user.model')

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
    const user = await User.findOne({ email }, (error, result) => {
      if (error) {
        console.log('Error: ', error)
        return new GraphQLError('Network Error.')
      }
    })
    if (!user) return new GraphQLError(`No user found for email ${email}`)

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return new GraphQLError('Invalid password')
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