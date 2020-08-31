const express = require('express')
const { createUser, logout, resetUserPassword } = require('./db/mutations/user.mutations')
const { signin, getUser } = require('./db/queries/user.queries')
const authenticate = require('./auth')
const { clearCookie, createPayload, setTokenAndCookie } = require('./utils')
const { transport, resetEmail } = require('./resetEmail')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body
    const newUser = await createUser(name, email.toLowerCase(), password, passwordConfirm)

    setTokenAndCookie(createPayload(newUser), res)
    res.status(200).send({
      userId: newUser._id,
      userName: newUser.name
    })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await signin(email.toLowerCase(), password)

    setTokenAndCookie(createPayload(user), res)
    res.status(200).send({
      userId: user._id,
      userName: user.name
    })
  }
  catch (error) {
    res.status(401).send({ error: error.message })
  }
})

router.route('/logout')
  .post(authenticate)
  .post(async (req, res) => {
    try {
      await logout(req.userId)
      clearCookie(res)
      res.status(200).send({ success: true })
    }
    catch (error) {
      res.status(400).send({ error })
    }

  })

router.route('/me')
  .all(authenticate)
  .get((req, res) => res.status(200).send({
    userId: req.userId,
    userName: req.userName
  }))

router.post('/password-recovery', async (req, res) => {
  try {
    const { email } = req.body
    const user = await getUser(email.toLowerCase())
    const reset = await user.generateResetToken()

    await transport.sendMail({
      from: 'kiesha.herman@gmail.com',
      to: user.email,
      subject: 'iClimb Tracker: Password Reset',
      html: resetEmail(`${process.env.FRONTEND_URL}/reset?resetToken=${reset.token}`)
    })

    console.log(`An email has been sent to ${email} to reset their password.`)
    res.status(200).send({
      message: "Password reset sent to email."
    })
  }
  catch (error) {
    res.status(401).send({ error: error.message })
  }
})

router.post('/password-reset', async (req, res) => {
  try {
    const { resetToken, password, passwordConfirm } = req.body

    const user = await resetUserPassword(
      resetToken,
      password,
      passwordConfirm
    )

    setTokenAndCookie(createPayload(user), res)
    res.status(200).send({
      userId: user._id,
      userName: user.name
    })
  }
  catch (error) {
    res.status(401).send({ error: error.message })
  }
})

router.route('/graphql')
  .all(authenticate)
  .all((req, res, next) => {
    req.context = { userId: req.userId }
    next()
  })

module.exports = router