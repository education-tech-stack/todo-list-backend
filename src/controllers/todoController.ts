import db from '../models'

const User = db.User
const Task = db.Task
const Column = db.Column
const Board = db.Board

export async function getBoard(req, res) {
  let data = await Board.findOne({
    where: {
      userId: req.user_id,
    }
  })
  res.send(data || {
    tasks: {},
    columns: {},
    columnOrder: [],
  })
}

export function getUsers(req, res) {
  User.findAll().then((users) => {
    res.send(users)
  })
}

export async function saveBoard(req, res) {
  const board = await Board.findOne({
    where: {
      userId: req.user_id,
    },
  })
  board.tasks = req.body.tasks || {}
  board.columnOrder = req.body.columnOrder || []
  board.columns = req.body.columns || {}
  
  try {
    await board.save()
    res.send({ status: 'success' })
  } catch (e) {
    console.error('Error saving board:', e)
    res.status(500).send({ status: 'error', message: 'Internal server error' })
  }
}

export function upsertColumn(req, res) {
  Column.upsert({
    ...req.body.data,
  })
    .then((column) => {
      res.send(column)
    })
    .catch((e) => {
      res.status(500).send({ error: e })
    })
}

export function upsertTask(req, res) {
  Task.upsert({
    ...req.body.data,
  })
    .then((task) => {
      res.send(task)
    })
    .catch((e) => {
      res.status(500).send({ error: e })
    })
}
