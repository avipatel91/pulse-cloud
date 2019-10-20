import express, { RequestHandler } from 'express'
import { getRepository, createQueryBuilder } from 'typeorm'
import wrapAsync from '../../utils/wrapAsync'
import { ForbiddenError, BadRequestError } from '../../common/Errors'
import { Session } from '../../entity/Session'
import { Member } from '../../entity/Member'

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
  await createQueryBuilder()
    .relation(Session, 'members')
    .of(req.session!.id)
    .add(req.user.id)
    .catch(e => {
      let errorMessage = ''
      if (/already exists/.test(e.detail)) {
        errorMessage = 'Member is already registered to session.'
      }
      throw new Error(errorMessage)
    })
  res.sendStatus(200)
}

const getSessions: RequestHandler = async (req, res) => {
  const sessions = await createQueryBuilder()
    .select('session.id')
    .addSelect('session.name')
    .from(Session, 'session')
    .innerJoin('member_sessions_session', 'm_s', 'm_s.sessionId = session.id')
    .where('m_s.memberId = :memberId', { memberId: req.user.id })
    .getRawMany()
  res.send(sessions)
}

const removeSession: RequestHandler = async (req, res) => {
  await createQueryBuilder()
    .relation(Session, 'members')
    .of(req.params.sessionId)
    .remove(req.user.id)
  res.sendStatus(200)
}

router.get('/:memberId/sessions', [
  wrapAsync(ensureIsMember),
  wrapAsync(getSessions),
])

router.post('/:memberId/sessions', [
  wrapAsync(ensureIsMember),
  wrapAsync(ensureSessionCode),
  wrapAsync(addSession),
])

router.delete('/:memberId/sessions/:sessionId', [
  wrapAsync(ensureIsMember),
  wrapAsync(removeSession),
])

export default router
