import express from 'express'
import helloWorldRouter from './helloWorld'
import heartRatesRouter from './heartRates'
import memberRouter from './member'
import trainerRouter from './trainer'

const router = express.Router()

router.use('/hello-world', helloWorldRouter)
router.use('/heart-rates', heartRatesRouter)
router.use('/member', memberRouter)
router.use('/trainer', trainerRouter)

export default router
