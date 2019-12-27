const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('passport-jwt')

const { signin } = require('./db/queries/user.queries')


// passport.use(new LocalStrategy({ email, password },
//   async (email, password, done) => {
//     try {
//       const user = await signin(email, password)
//       return done(null, user)
//     } catch (error) {
//       return done(null, false, error)
//     }
//   }
// ))

const opts = {
  jwtFromRequest: req => req.cookies.userToken,
  secretOrKey: process.env.JWT_SECRET,
  // issuer: 'iclimb-tracker'
}

passport.use(new jwt.Strategy(opts,
  async (token, done) => {
    console.log("Token:", token)
    if (!token)
      return done(null, false)

    if (Date.now() > token.expiry)
      return done(null, false, 'token expired')

    //check if correct user??
    return done(null, token)
  }
))

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false },
    (error, user, info) => {
      if (error || !user) {
        res.status(401).send({ error: 'User is unauthorized.' })
        // res.redirect('/login')
      } else {
        req.userId = user.userId
        // res.status(200).send({ success: true })
        next()
      }
    }
  )(req, res, next)
}