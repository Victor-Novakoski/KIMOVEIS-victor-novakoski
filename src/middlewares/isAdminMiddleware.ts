import AppError from '../errors/AppError'
import { NextFunction, Request, Response } from 'express'

const isAdminMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  let isAdm = req.user.isAdm
  if (!isAdm) {
    throw new AppError('unauthorized', 403)
  }
  return next()
}

export default isAdminMiddleware
