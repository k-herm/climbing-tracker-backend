const {
   GraphQLObjectType,
   GraphQLID,
   GraphQLString,
   GraphQLNonNull
} = require('graphql')

const User = new GraphQLObjectType({
   name: 'user',
   description: 'Basic user information',
   fields: () => ({
      id: {
         type: new GraphQLNonNull(GraphQLID)
      },
      name: {
         type: new GraphQLNonNull(GraphQLString)
      },
      email: {
         type: new GraphQLNonNull(GraphQLString)
      }
   })
})

module.exports = { User }