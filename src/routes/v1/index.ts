import express from 'express'
import helloWorldRouter from './helloWorld'

const router = express.Router()

router.use('/hello-world', helloWorldRouter)

export default router
