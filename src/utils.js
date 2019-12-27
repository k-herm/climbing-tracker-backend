const jwt = require('jsonwebtoken')

const MAX_AGE = 1000 * 60 * 60 * 24 * 31
const COOKIE_NAME = 'userToken'

const createPayload = (user) => ({
  userId: user._id,
  expiry: Date.now() + MAX_AGE
})

const cookieOptions = {
  domain: process.env.LOCAL_DOMAIN,
  maxAge: MAX_AGE,
  httpOnly: true,
  secure: true
}

const setTokenAndCookie = (payload, res) => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      issuer: process.env.LOCAL_DOMAIN,
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