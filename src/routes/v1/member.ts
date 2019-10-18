import express, { RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import wrapAsync from '../../utils/wrapAsync'
import { ForbiddenError, BadRequestError } from '../../common/Errors'
import { Session } from '../../entity/Session'

const router = express.Router()

const ensureIsMember: RequestHandler = async (req, res, next) => {
  if (req.user.type !== 'member') {
    throw new ForbiddenError('Must be a member')
  }
  if (req.user.id !== req.params.memberId) {
    throw new ForbiddenError('Unauthorized')
  }
  next()
}

const ensureSessionCode: RequestHandler = async (req, res, next) => {
  const { sessionCode } = req.body
  if (!sessionCode) {
    throw new BadRequestError('Session code must be present')
  }
  const session = await getRepository(Session)
    .createQueryBuilder()
    .select('session.id')
    .from(Session, 'session')
    .where('session."sessionCode" = :sessionCode', { sessionCode })
    .getOne()
  if (!session) throw new BadRequestError('Invalid session code')
  req.session = { id: session.id }
  next()
}

const addSession: RequestHandler = async (req, res) => {
  res.sendStatus(200)
}

router.post('/:memberId/session', [
  wrapAsync(ensureIsMember),
  wrapAsync(ensureSessionCode),
  wrapAsync(addSession),
])

export default router
