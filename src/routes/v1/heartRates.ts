import express, { RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import wrapAsync from '../../utils/wrapAsync'
import { Member } from '../../entity/Member'
import { BadRequestError } from '../../common/Errors'

const router = express.Router()

const ensureMemberExistence: RequestHandler = async (req, res, next) => {
  const memberRepository = getRepository(Member)
  const { id } = req.body
  if (!id) {
    throw new BadRequestError('Provide memberId')
  }
  req.member = await memberRepository.findOneOrFail(id).catch(() => {
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
  const { heartRates } = req.member!
  heartRates.push(req.body.heartRate)
  await memberRepository.update(req.member!.id, {
    heartRates,
  })
  res.sendStatus(200)
}

router.post('/', [
  wrapAsync(ensureMemberExistence),
  wrapAsync(ensureHeartRate),
  wrapAsync(setAverageHeartRate),
])

export default router
