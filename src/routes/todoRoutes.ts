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

router.get('/users', verifyToken, getUsers)
router.get('/board', verifyToken, getBoard)

router.post('/saveBoard', verifyToken, saveBoard)
router.post('/upsertColumn', verifyToken, upsertColumn)
router.post('/upsertTask', verifyToken, upsertTask)

export default router
