import bcrypt from 'bcrypt'
import db from '../models'
import jwt from 'jsonwebtoken'

const User = db.User
const Board = db.Board

export async function signup(req, res) {
  try {
    const { userName, email, password } = req.body
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    }

    const user = await User.create(data)
    const board = await Board.create({
      userId: user.id,
      tasks: {},
      columnOrder: [],
      columns: {},
    })
    user.Boards = [board]

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      })

      res.cookie('jwt', token, {
        maxAge: 1 * 24 * 60 * 60,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      console.log('user', JSON.stringify(user, null, 2))
      return res.status(201).send({
        status: 'success',
        board_page: '/',
        id: user.id,
        userName: user.userName,
        board_data: user.Boards,
      })
    } else {
      return res.status(409).send('Details are not correct')
    }
  } catch (error) {
    console.log(error)
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({
      where: {
        email: email,
      },
      include: Board,
    })

    if (user) {
      const isSame = await bcrypt.compare(password, user.password)

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        })

        res.cookie('jwt', token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })

        return res.status(201).send({
          status: 'success',
          board_page: '/',
          id: user.id,
          userName: user.userName,
          board_data:
            user.Boards.length === 0
              ? [{ tasks: [], columns: [], columnOrder: [] }]
              : user.Boards,
        })
      } else {
        return res.status(401).send('Authentication failed')
      }
    } else {
      return res.status(401).send('Authentication failed')
    }
  } catch (error) {
    console.log(error)
  }
}
