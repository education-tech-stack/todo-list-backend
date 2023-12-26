import express from 'express'
import {
  getBoard,
  getBoard2,
  getColumns,
  getTasks,
  getUsers,
  upsertColumn,
  upsertTask,
} from '../controllers/todoController'
import verifyToken from '../middlewares/verifyAuth'

const router = express.Router()

router.get('/users', verifyToken, getUsers)
router.get('/columns', verifyToken, getColumns)
router.get('/tasks', verifyToken, getTasks)
router.get('/board', getBoard)
router.get('/board2', verifyToken, getBoard2)

router.post('/upsertColumn', verifyToken, upsertColumn)
router.post('/upsertTask', verifyToken, upsertTask)

export default router
