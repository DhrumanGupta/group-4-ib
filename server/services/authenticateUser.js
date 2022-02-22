const jwt = require('jsonwebtoken')

const jwtAuthToken = process.env.JWT_AUTH_TOKEN

const authenticateUser = async (req, res, next) => {
  const apiKey = req.headers['Api-Key']
  if (apiKey) {
    req.user.email = 'dhruman.basketball@gmail.com'
  }

  const accessToken = req.cookies.accessToken

  if (!accessToken) {
    return res.status(403).send({ message: 'User not authenticated' })
  }

  jwt.verify(accessToken, jwtAuthToken, async (err, data) => {
    if (data) {
      req.user = data
      next()
      return
    } else if (err.message === 'TokenExpiredError') {
      res.status(403).send({ message: 'Token Expired' })
      return
    }

    res.status(403).send({ error: err, message: 'User not authenticated' })
  })
}

module.exports = authenticateUser
