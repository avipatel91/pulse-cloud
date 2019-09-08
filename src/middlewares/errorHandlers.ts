import { Request, Response, NextFunction } from 'express'
import { AuthError } from '../common/Errors'

function handleAuthError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof AuthError) {
    res.status(401).send(error.message)
  } else next()
}

export { handleAuthError }
