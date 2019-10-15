import express from 'express'
import helloWorldRouter from './helloWorld'
import heartRatesRouter from './heartRates'
import memberRouter from './member'

const router = express.Router()

router.use('/hello-world', helloWorldRouter)
router.use('/heart-rates', heartRatesRouter)
router.use('/member', memberRouter)

export default router
