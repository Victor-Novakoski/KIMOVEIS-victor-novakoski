import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

const validatedIsAdmMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm
  const id = req.user.id
  const params = req.params.id

  if (isAdm) {
    return next()
  }

  if (id != params) {
    throw new AppError('unauthorized', 401)
  }

  return next()
}

export default validatedIsAdmMiddleware
