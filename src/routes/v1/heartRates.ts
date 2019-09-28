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

const addHeartRate: RequestHandler = async (req, res) => {
  const memberRepository = getRepository(Member)
  const { heartRateRunningTotal } = req.member!
  heartRateRunningTotal.sum += req.body.heartRate
  heartRateRunningTotal.count++
  await memberRepository.update(req.member!.id, {
    heartRateRunningTotal,
  })
  res.sendStatus(200)
}

const getAverageHeartRates: RequestHandler = async (req, res) => {
  const memberRepository = getRepository(Member)
  const members = await memberRepository.find()

  const retMembers = []
  for (const currMember of members) {
    const { heartRateRunningTotal } = currMember
    const numRates = Math.max(1, heartRateRunningTotal.count)
    const calcAverageHeartRate = Math.floor(
      heartRateRunningTotal.sum / numRates,
    )

    retMembers.push({
      firstName: currMember['firstName'],
      id: currMember['id'],
      averageHeartRate: calcAverageHeartRate,
    })
  }

  res.send(retMembers)
}

router.post('/', [
  wrapAsync(ensureMemberExistence),
  wrapAsync(ensureHeartRate),
  wrapAsync(addHeartRate),
])

router.get('/', getAverageHeartRates)

export default router
