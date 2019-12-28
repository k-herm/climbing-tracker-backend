const { createUser } = require('../user.mutations')
const User = require('../../models/user.model')

jest.mock('bcryptjs')
const bcrypt = require('bcryptjs')

describe('user mutations', () => {
  const name = "John"
  const email = "John@aol.com"

  afterEach(() => {
    User.deleteOne({ name, email })
  })

  it('should check if password and confirmPassword match', async () => {
    const password = "password"
    const passwordConfirm = "notPassword"

    const newUser = createUser(name, email, password, passwordConfirm).catch(e =>
      expect(e.message).toMatch('Passwords do not match.')
    )
  })

  it('should set password as a hash password', async () => {
    const password = 'password'
    const passwordConfirm = 'password'
    const bcryptMockReturnValue = 'secretpassword'

    bcrypt.hash.mockResolvedValue(bcryptMockReturnValue)

    const newUser = createUser(name, email, password, passwordConfirm).then(result =>
      expect(result.password).toBe(bcryptMockReturnValue)
    )
  })
})
