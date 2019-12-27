const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()
const { createUser } = require('./db/mutations/user.mutations')
const authenticate = require('./auth')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body
    const newUser = await createUser(name, email, password, passwordConfirm)

    const payload = {
      userId: newUser._id,
      expiry: Date.now() + (1000 * 60 * 60 * 24 * 31)
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.cookie('userToken', token, {
      domain: process.env.LOCAL_DOMAIN,
      maxAge: (1000 * 60 * 60 * 24 * 31),
      httpOnly: true,
      secure: true
    })

    res.status(200).send({ success: true })

  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get('/validate', authenticate)

// router.post('/login', async (req, res) => {
//   passport.authenticate('local', {
//     session: false,
//     failureFlash: true,
//     failureRedirect: '/login'
//   },
//     (error, user) => {
//       //req.login??
//     }
//   )
// })

//renew
//logout res.clearCookie(cookieName, cookieOptions)

module.exports = router