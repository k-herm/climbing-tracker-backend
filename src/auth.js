const passport = require('passport')
const jwt = require('passport-jwt')
const User = require('./db/models/user.model')

const opts = {
  jwtFromRequest: req => req.cookies.userToken,
  secretOrKey: process.env.JWT_SECRET,
  issuer: process.env.LOCAL_DOMAIN
}

passport.use(new jwt.Strategy(opts,
  async (token, done) => {
    if (!token)
      return done(null, false)

    return User.findOne({ token: token.token }).then((user) => {
      if (!user) return done(null, false)
      return done(null, token)
    })
  }
))

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false },
    (error, user, info) => {
      if (error || !user) {
        res.status(401).send({ error: 'Please sign in to access.' })
        // res.redirect('/login')
      } else {
        req.userId = user.userId
        next()
      }
    }
  )(req, res, next)
}