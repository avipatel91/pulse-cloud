import express from 'express'
import helloWorldRouter from './helloWorld'
import heartRatesRouter from './heartRates'

const router = express.Router()

router.use('/hello-world', helloWorldRouter)
router.use('/heart-rates', heartRatesRouter)

export default router
