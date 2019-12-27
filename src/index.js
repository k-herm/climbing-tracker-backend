const express = require('express')
const graphqlHTTP = require('express-graphql')
// const cors = require('cors')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
require('dotenv').config({ path: ".env" })

// const createContext = require('./context')
const rootSchema = require('./graphql/rootSchema')

const app = express()
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(cors({
//    credentials: true,
//    origin: [
//       /^https?:\/\/localhost:\d{4}$/,
//       //website domain env
//    ]
// }))

app.use(passport.initialize())
app.use('/', require('./controller'))

// app.use('/graphql', async (req, res, next) => {
//    req.context = await createContext(req)
//    next()
// })

app.use('/graphql',
   graphqlHTTP(async (req) => ({
      schema: rootSchema,
      graphiql: true,
      // context: req.context,
      pretty: true
   }))
)

mongoose.connect(process.env.MONGO_URL, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
})
   .then(() => console.log("Database connected"))
   .catch((error) => console.log("Database Error: ", error))

app.listen(process.env.PORT, () => {
   console.log('Listening at port:', process.env.port)
})
