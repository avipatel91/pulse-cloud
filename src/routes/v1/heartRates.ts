import express, { RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import wrapAsync from '../../utils/wrapAsync'
import { Member } from '../../entity/Member'
import { BadRequestError } from '../../common/Errors'

const router = express.Router()

const ensureMemberExistence: RequestHandler = async (req, res, next) => {
  const memberRepository = getRepository(Member)
  const { memberId } = req.body
  if (!memberId) {
    throw new BadRequestError('Provide memberId')
  }
  req.member = await memberRepository.findOneOrFail(memberId).catch(() => {
    throw new BadRequestError('Member does not exist')
  })

  next()
}

const ensureHeartRate: RequestHandler = async (req, res, next) => {
  const { heartRate } = req.body
  if (!heartRate) {
    throw new BadRequestError('Provide heartRate')
  }
  next()
}

const setAverageHeartRate: RequestHandler = async (req, res) => {
  const memberRepository = getRepository(Member)
  let { averageHeartRate: hrt } = req.member!
  const newCount = ++hrt.count
  const newAverageHeartRate =
    (hrt.averageHeartRate + req.body.heartRate) / newCount
  hrt = {
    averageHeartRate: newAverageHeartRate,
    count: newCount,
  }
  await memberRepository.update(req.member!.id, {
    averageHeartRate: hrt,
  })
  res.sendStatus(200)
}

router.put('/', [
  wrapAsync(ensureMemberExistence),
  wrapAsync(ensureHeartRate),
  wrapAsync(setAverageHeartRate),
])

export default router
