import { Request, Response, NextFunction } from 'express'
import { AuthError, BadRequestError, ForbiddenError } from '../common/Errors'

function handleAuthError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof AuthError) {
    res.status(401).send(error.message)
  } else next(error)
}

function handleBadRequestError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof BadRequestError) {
    res.status(400).send(error.message)
  } else next(error)
}

function handleForbiddenError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error instanceof ForbiddenError) {
    res.status(403).send(error.message)
  } else next(error)
}

function handleDefaultError(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void {
  res.status(400).send(error.message)
}

export {
  handleAuthError,
  handleBadRequestError,
  handleDefaultError,
  handleForbiddenError,
}
