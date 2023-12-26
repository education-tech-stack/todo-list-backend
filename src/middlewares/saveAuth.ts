import db from '../models'
const User = db.users

export default async function saveUser(req, res, next) {
  //search the database to see if user exist
  try {
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    })
    if (username) {
      return res.status(409).json({ error: 'Username already taken!' })
    }

    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    })

    if (emailcheck) {
      return res.status(409).json({ error: 'Email already exist, please login!' })
    }

    next()
  } catch (error) {
    console.log(error)
  }
}
