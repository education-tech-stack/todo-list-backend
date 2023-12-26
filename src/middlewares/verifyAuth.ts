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
    const decoded = jwt.verify(token ? token: authHeader.split(' '[1]), process.env.SECRET_KEY)
    User.findByPk(decoded.id).then((user) => {
      req.user_id = user.id
      next()
    })
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
