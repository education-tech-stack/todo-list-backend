import express from 'express'
import { signup, login } from '../controllers/userController'
import userAuth from '../middlewares/saveAuth'

const router = express.Router()

router.post('/signup', userAuth, signup)

router.post('/login', login)

export default router;
