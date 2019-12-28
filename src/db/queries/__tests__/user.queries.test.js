const { signin } = require('../user.queries')

jest.mock('bcryptjs')
jest.mock('../../models/user.model')

const bcrypt = require('bcryptjs')
const User = require('../../models/user.model')

const setUserMockReturnValue = () => ({
  _id: 123,
  name: "John",
  email: "John@aol.com",
  password: "password",
  token: '123',
  generateToken: jest.fn(),
  __v: 0
})

const setBcryptMockReturnValue = (p1, p2) => {
  return p1 === p2
}

describe('user queries', () => {
  it('should signin if user email and password match', async () => {
    const email = "John@aol.com"
    const password = "password"
    const userFound = setUserMockReturnValue()

    User.findOne.mockResolvedValue(userFound)
    bcrypt.compare.mockResolvedValue(
      setBcryptMockReturnValue(password, userFound.password)
    )

    const user = await signin(email, password)
    expect(user).toEqual(userFound)
  })

  it('should return an error if passwords do not match', async () => {
    const email = "John@aol.com"
    const password = "notThePassword"
    const userFound = setUserMockReturnValue()

    User.findOne.mockResolvedValue(userFound)
    bcrypt.compare.mockResolvedValue(
      setBcryptMockReturnValue(password, userFound.password)
    )

    const user = await signin(email, password).catch(e =>
      expect(e.message).toMatch('Invalid password')
    )
  })

  it('should return an error if email is not found', async () => {
    const email = "Jane@aol.com"
    const password = "password"
    const userFound = null

    User.findOne.mockResolvedValue(userFound)

    const user = await signin(email, password).catch(e =>
      expect(e.message).toMatch(`No user found for email ${email}`)
    )
  })
})
