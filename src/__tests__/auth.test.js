jest.mock('passport')
jest.mock('passport-jwt')
jest.mock('../db/models/user.model')

const authenticate = require('../auth')
const passport = require('passport')
const jwt = require('passport-jwt')
const User = require('../db/models/user.model')

describe('authenticate', () => {
  it('should return user id and name on request if authorized', () => {
    const user = { _id: '123', name: 'Joe' }
    passport.authenticate.mockImplementation((id, config, fn) =>
      () => fn(null, user)
    )

    const req = { request: true }
    const res = jest.fn()
    const next = jest.fn()

    authenticate(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(req).toHaveProperty('userId', user._id)
    expect(req).toHaveProperty('userName', user.name)
  })

  it('should send status 401 if unauthorized', () => {
    passport.authenticate.mockImplementation((id, config, fn) =>
      () => fn(null, false)
    )

    const req = { request: true }
    const res = { status: jest.fn(() => ({ send: jest.fn() })) }
    const next = jest.fn()

    authenticate(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })
})

describe('JWT strategy', () => {
  const token = { userId: '123' }
  const user = { _id: '123', name: 'Joe' }
  const strategyFn = jwt.Strategy.mock.calls[0][1]

  it('should return false if no token', async () => {
    const strategyFn = jwt.Strategy.mock.calls[0][1]
    const token = undefined
    const done = jest.fn()

    await strategyFn(token, done)

    expect(done).toHaveBeenCalledTimes(1)
    expect(done).toHaveBeenCalledWith(null, false)
  })

  it('should return user if valid token', async () => {
    User.findById.mockResolvedValue(user)
    const done = jest.fn()

    await strategyFn(token, done)

    expect(User.findById).toHaveBeenCalledWith({ _id: token.userId })
    expect(done).toHaveBeenCalledTimes(1)
    expect(done).toHaveBeenCalledWith(null, user)
  })

  it('should return false if invalid token', async () => {
    User.findById.mockRejectedValue()
    const done = jest.fn()

    await strategyFn(token, done)

    expect(User.findById).toHaveBeenCalledWith({ _id: token.userId })
    expect(done).toHaveBeenCalledTimes(1)
    expect(done).toHaveBeenCalledWith(null, false)
  })
})
