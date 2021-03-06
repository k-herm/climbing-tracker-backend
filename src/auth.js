const passport = require('passport')
const jwt = require('passport-jwt')
const User = require('./db/models/user.model')

const issuer = process.env.NODE_DEV === 'development'
  ? process.env.LOCAL_DOMAIN
  : process.env.APP_DOMAIN

const opts = {
  jwtFromRequest: req => req.cookies.userToken,
  secretOrKey: process.env.JWT_SECRET,
  issuer
}

passport.use(new jwt.Strategy(opts,
  async (token, done) => {
    if (!token) {
      return done(null, false)
    }
    try {
      const user = await User.findById({ _id: token.userId })
      if (!user || user.token !== token.token)
        return done(null, false)

      return done(null, user)
    } catch (error) {
      console.log("ERROR AUTHENTICATING: ", error);
      return done(null, false)
    }
  })
)

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false },
    (error, user, info) => {
      if (error || !user) {
        console.log("User unauthorized")
        res.status(401).send({ error: 'Please sign in to access.' })
      } else {
        console.log(`User ${user._id} authorized to access resource`)
        req.userId = user._id
        req.userName = user.name
        next()
      }
    }
  )(req, res, next)
}