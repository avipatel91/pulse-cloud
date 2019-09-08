import admin from 'firebase-admin'
import { RequestHandler, Request } from 'express'
import { AuthError } from '../common/Errors'
import wrappedAsync from '../utils/wrapAsync'

function retrieveToken(req: Request): string {
  const authHeader = req.get('Authorization')
  if (!authHeader) throw new AuthError('No Token Provided')
  const token = authHeader.split('Bearer ')
  if (token.length == 2) {
    return token[1]
  }
  return ''
}

export const authenticate: RequestHandler = wrappedAsync(
  async (req, res, next) => {
    const idToken = retrieveToken(req)
    try {
      req.token = await admin.auth().verifyIdToken(idToken)
    } catch (e) {
      throw new AuthError('Unauthorized')
    }
    next()
  },
)
