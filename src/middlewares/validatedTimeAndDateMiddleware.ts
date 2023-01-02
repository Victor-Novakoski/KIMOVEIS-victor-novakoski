import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/AppError'

const validatedTimeAndDateMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const hour = parseInt(req.body.hour.split(':')[0])
  const date = new Date(req.body.date).toString().split(' ')[0]

  if (date === 'Sun' || date === 'Sat') {
    throw new AppError('Invalid Date!', 400)
  }

  if (hour < 8 || hour >= 18) {
    throw new AppError('Invalid Hour!', 400)
  }

  return next()
}

export default validatedTimeAndDateMiddleware
