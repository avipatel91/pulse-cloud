import express, { RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import { getConnection } from 'typeorm'
import wrapAsync from '../../utils/wrapAsync'
import { Session } from '../../entity/Session'
import { Trainer } from '../../entity/Trainer'
import { BadRequestError } from '../../common/Errors'

const router = express.Router()

const ensureTrainerType: RequestHandler = async (req, res, next) => {
  const type = req.user['type']

  if (!type) {
    throw new BadRequestError('Provide user type')
  } else if (type != 'trainer') {
    throw new BadRequestError('User is not a trainer')
  }

  next()
}

const ensureTrainerExistence: RequestHandler = async (req, res, next) => {
  const trainerRepository = getRepository(Trainer)
  const { id } = req.body
  const trainerId = req.params.trainerId

  await trainerRepository.findOneOrFail(trainerId).catch(() => {
    throw new BadRequestError('Trainer does not exist')
  })

  next()
}

const ensureSessionExistence: RequestHandler = async (req, res, next) => {
  const sessionRepository = getRepository(Session)
  const sessionId = Number(req.params.sessionId)
  const trainerId = req.params.trainerId
  const userId = req.user['id']

  if (userId != trainerId) {
    throw new BadRequestError(
      'User and trainer IDs do not match: User does not have access to delete this session',
    )
  }

  const session = await getConnection()
    .createQueryBuilder()
    .select('session')
    .from(Session, 'session')
    .where({
      id: sessionId,
      trainer: { id: trainerId },
    })
    .getOne()
  if (!session) {
    throw new BadRequestError('Session does not exist under this trainer')
  }

  next()
}

const createSession: RequestHandler = async (req, res) => {
  const sessionRepository = getRepository(Session)
  const trainerId = req.params.trainerId
  const { name } = req.body

  const sessionCode = name.substring(0, 4) + '-' + trainerId.substring(0, 5)
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Session)
    .values([
      { sessionCode: sessionCode, name: name, trainer: { id: trainerId } },
    ])
    .execute()

  res.send({ sessionCode })
}

const getSessionCodes: RequestHandler = async (req, res) => {
  const sessionRepository = getRepository(Session)
  const trainerId = req.params.trainerId

  const sessions = await sessionRepository.find({
    where: { trainer: { id: trainerId } },
  })

  const retSessions = []
  for (const currSession of sessions) {
    retSessions.push({
      name: currSession['name'],
      id: currSession['id'],
      sessionCode: currSession['sessionCode'],
    })
  }

  res.send(retSessions)
}

const deleteSession: RequestHandler = async (req, res) => {
  const sessionRepository = getRepository(Session)
  const trainerId = req.params.trainerId
  const id = req.params.sessionId

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Session)
    .where({ id: id, trainer: { id: trainerId } })
    .execute()

  res.sendStatus(200)
}

router.post('/:trainerId/sessions', [
  wrapAsync(ensureTrainerType),
  wrapAsync(ensureTrainerExistence),
  wrapAsync(createSession),
])

router.get('/:trainerId/sessions', [
  wrapAsync(ensureTrainerType),
  wrapAsync(ensureTrainerExistence),
  wrapAsync(getSessionCodes),
])

router.delete('/:trainerId/sessions/:sessionId', [
  wrapAsync(ensureTrainerType),
  wrapAsync(ensureTrainerExistence),
  wrapAsync(ensureSessionExistence),
  wrapAsync(deleteSession),
])

export default router
