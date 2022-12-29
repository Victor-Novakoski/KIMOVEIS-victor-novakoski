import { Request, Response, NextFunction } from 'express'
import AppDataSource from '../data-source'
import User from '../entities/userEntity'
import AppError from '../errors/AppError'
import jwt from 'jsonwebtoken'

const isActiveMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User)

  const user = await userRepo.findOneBy({ id: req.params.id })

  if (!user.isActive) {
    throw new AppError('Cannot delete unactive users', 400)
  }
  return next()
}

export default isActiveMiddleware
