//import verify

const createContext = async (request) => {
  const user = {
    id: request.header('user-id') || 'undefined'
  }

  const bearerToken = request.header('Authorization') || ''
  const token = bearerToken.split(' ')[1]

  if (token) {
    const jwtRegEx = /^([A-Za-z0-9\-_~+\/]+[=]{0,2})\.([A-Za-z0-9\-_~+\/]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+\/]+[=]{0,2}))?$/
    if (jwtRegEx.test(token)) {
      const { userId } = verify(token, process.env.JWT_SECRET)
      user.id = userId
    }
  }

  return user
}

module.exports = createContext