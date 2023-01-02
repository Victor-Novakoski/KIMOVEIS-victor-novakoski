import { Request, Response, NextFunction } from 'express'
import AppDataSource from '../data-source'
import User from '../entities/userEntity'
import AppError from '../errors/AppError'
import jwt from 'jsonwebtoken'

const isValidIdMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User)
  let user = await userRepo.findOneBy({ id: req.params.id })
  if (!user) throw new AppError('Cannot delete unactive users', 404)

  return next()
}

export default isValidIdMiddleware
