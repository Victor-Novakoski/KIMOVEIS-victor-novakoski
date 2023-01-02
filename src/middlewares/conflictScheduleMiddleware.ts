import AppDataSource from '../data-source'
import Schedules from '../entities/schedulesEntity'
import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'

const conflictSchedule = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Boolean> => {
  const schedulesRepository = AppDataSource.getRepository(Schedules)

  const scheduleSamePropertyAndDatetime = await schedulesRepository.findBy({
    date: req.body.date,
    hour: req.body.hour,
    propertyId: req.body.propertyId,
  })
  if (scheduleSamePropertyAndDatetime.length) {
    throw new AppError("Schedule already exists!", 409)
  }

  const scheduleSameUserAndDateTime = await schedulesRepository.findBy({
    date: req.body.date,
    hour: req.body.hour,
    userId: req.body.userId,
  })
  if (scheduleSameUserAndDateTime.length) {
    throw new AppError("Schedule already exists!", 409)
  }

  return next()
}

export default conflictSchedule
