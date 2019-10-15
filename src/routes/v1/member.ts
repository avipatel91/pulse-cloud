import express, { RequestHandler } from 'express'
import wrapAsync from '../../utils/wrapAsync'
import { ForbiddenError } from '../../common/Errors'

const router = express.Router()

const ensureIsMember: RequestHandler = async (req, res, next) => {
  if (req.user!.type !== 'member') {
    throw new ForbiddenError('Must be a member')
  }
  next()
}

const ensureClassCode: RequestHandler = async (req, res, next) => {
  next()
}

const addSession: RequestHandler = async (req, res) => {
  res.sendStatus(200)
}

router.post('/:memberId/session', [
  wrapAsync(ensureIsMember),
  wrapAsync(ensureClassCode),
  wrapAsync(addSession),
])

export default router
