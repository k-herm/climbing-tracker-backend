const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
// const compression = require('compression')
const mongoose = require('mongoose')
require('dotenv').config({ path: ".env" })

const rootSchema = require('./graphql/rootSchema')

const app = express()
// app.use(compression())

// GraphqQL server route
app.use('/graphql',
   // cors(),
   graphqlHTTP(async (req) => ({
      schema: rootSchema,
      graphiql: true,
      pretty: true
   }))
)

// Connect mongo database
mongoose.connect(process.env.MONGO_URL, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
})
   .then(() => console.log("Database connected"))
   .then(() => app.listen(process.env.PORT, () => {
      console.log('Listening at port:', process.env.port)
   }))
   .catch((error) => console.log("Database Error: ", error))
