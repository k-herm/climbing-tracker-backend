const express = require('express')
const { createUser, logout } = require('./db/mutations/user.mutations')
const { signin } = require('./db/queries/user.queries')
const authenticate = require('./auth')
const { clearCookie, createPayload, setTokenAndCookie } = require('./utils')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body
    const newUser = await createUser(name, email, password, passwordConfirm)

    setTokenAndCookie(createPayload(newUser), res)
    res.status(200).send({
      userId: user._id,
      userName: user.name
    })
  }
  catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await signin(email, password)

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

router.route('/graphql')
  .all(authenticate)
  .all((req, res, next) => {
    req.context = { userId: req.userId }
    next()
  })

module.exports = router