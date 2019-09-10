import { RequestHandler } from 'express'

export default function wrapAsync(fn: RequestHandler): RequestHandler {
  const wrappedFn: RequestHandler = (req, res, next) => {
    fn(req, res, next).catch(next)
  }
  return wrappedFn
}
