import jwt from 'jsonwebtoken'
import db from '../models'

const User = db.User

export default function verifyToken(req, res, next) {
  const token = req.cookies.jwt
  const authHeader = req.headers['Authorization']

  if (!token && !authHeader) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    if (authHeader == process.env.AUTH_TOKEN) {
      req.user_id = 1
      next()
    } else {
      User.findByPk(decoded.id).then((user) => {
        req.user_id = user.id
        next()
      })
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
