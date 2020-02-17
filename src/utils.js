const jwt = require('jsonwebtoken')

const MAX_AGE = 1000 * 60 * 60 * 24 * 31
const COOKIE_NAME = 'userToken'
const devEnv = process.env.NODE_ENV === 'development'

const createPayload = (user) => ({
  userId: user._id,
  userName: user.name,
  token: user.token,
  expiry: Date.now() + MAX_AGE
})

const issuer = devEnv
  ? process.env.LOCAL_DOMAIN
  : process.env.APP_DOMAIN

const cookieOptions = {
  maxAge: MAX_AGE,
  httpOnly: true,
}

if (!devEnv) {
  cookieOptions.domain = process.env.APP_DOMAIN
  cookieOptions.secure = true
}

const setTokenAndCookie = (payload, res) => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      issuer,
      expiresIn: '31d'
    }
  )

  res.cookie(COOKIE_NAME, token, cookieOptions)
}

const clearCookie = (res) => {
  res.clearCookie(COOKIE_NAME, cookieOptions)
}

module.exports = {
  clearCookie,
  createPayload,
  setTokenAndCookie
}