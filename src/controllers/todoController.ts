import db from '../models'

const User = db.users
const Task = db.tasks
const Column = db.columns

export function getUsers(req, res) {
  User.findAll().then((users) => {
    res.send(users)
  })
}

export function getColumns(req, res) {
  Column.findAll().then((columns) => {
    res.send(columns)
  })
}

export function getTasks(req, res) {
  Task.findAll().then((tasks) => {
    res.send(tasks)
  })
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

export async function getBoard2(req, res) {
  let data = await Column.findAll({
    include: [
      {
        model: Task,
        order: [['order', 'ASC']],
      },
    ],
    order: [['order', 'ASC']],
  })
  res.send(data)
}

export async function getBoard(req, res) {
  let data = await Column.findAll({
    include: [
      {
        model: Task,
        order: [['order', 'ASC']],
      },
    ],
    order: [['order', 'ASC']],
  })

  let boardData = {
    tasks: {},
    columns: {},
    columnOrder: [],
  }

  for (let i = 0; i < data.length; i++) {
    boardData.columnOrder.push(`column-${data[i].id}`)

    boardData.columns[`column-${data[i].id}`] = data[i].toJSON()
    const column = boardData.columns[`column-${data[i].id}`]
    column.id = `column-${column.id}`
    column.taskIds = []
    
    for (let j = 0; j < data[i].tasks.length; j++) {
      column.taskIds.push(
        data[i].tasks[j].id
      )
      boardData.tasks[data[i].tasks[j].id] = data[i].tasks[j]
    }
    delete column.tasks
  }

  res.send(boardData)
}
