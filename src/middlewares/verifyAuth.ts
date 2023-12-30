import jwt from 'jsonwebtoken'
import db from '../models'

const User = db.User

export default function verifyToken(req, res, next) {
  const token = req.cookies.jwt
  const authHeader = req.headers['authorization']

  if (!token && !authHeader) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    if (authHeader) {
      if (authHeader !== process.env.AUTH_TOKEN)
        throw Error('Invalid Auth token')
      req.user_id = 1
      next()
      return;
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    User.findByPk(decoded.id).then((user) => {
      req.user_id = user.id
      next()
    })
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
