import express from 'express'
import {
  getBoard,
  getUsers,
  saveBoard,
  upsertColumn,
  upsertTask
} from '../controllers/todoController'
import verifyToken from '../middlewares/verifyAuth'

const router = express.Router()

router.post('/users', verifyToken, getUsers)
router.post('/board', verifyToken, getBoard)

router.post('/saveBoard', verifyToken, saveBoard)
router.post('/upsertColumn', verifyToken, upsertColumn)
router.post('/upsertTask', verifyToken, upsertTask)

export default router
