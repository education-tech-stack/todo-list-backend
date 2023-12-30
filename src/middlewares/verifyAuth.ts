import jwt from 'jsonwebtoken'
import db from '../models'

const User = db.User

export default function verifyToken(req, res, next) {
  const token = req.cookies.jwt

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    User.findByPk(decoded.id).then((user) => {
      req.user_id = user.id
      next()
    })
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
