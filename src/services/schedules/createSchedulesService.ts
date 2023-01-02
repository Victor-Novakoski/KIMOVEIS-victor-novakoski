import { Brackets } from 'typeorm'
import AppDataSource from '../../data-source'
import Property from '../../entities/propertiesEntity'
import Schedules from '../../entities/schedulesEntity'
import User from '../../entities/userEntity'
import AppError from '../../errors/AppError'
import { IScheduleRequest } from '../../interfaces/schedules'

const createSchedulesService = async (
  userData: IScheduleRequest
): Promise<Schedules> => {
  const schedulesRepository = AppDataSource.getRepository(Schedules)
  const propertyRepository = AppDataSource.getRepository(Property)
  const userRepository = AppDataSource.getRepository(User)

  const propertyValid = await propertyRepository.findOneBy({
    id: userData.propertyId,
  })

  if (!propertyValid) {
    throw new AppError('Invalid Property!', 404)
  }

  const schedule = await schedulesRepository.createQueryBuilder('schedules').
  where('schedules.date = :date', {date: userData.date}).
  andWhere('schedules.hour = :hour', {hour: userData.hour}).
  andWhere(new Brackets(qb => {
    qb.where('schedules.userId = :user', { user: userData.userId }).
    orWhere('schedules.propertyId = :property', { property: userData.propertyId })
  })).
  getMany()

  if (schedule.length > 0) {
    throw new AppError('Schedule already exists!', 409)
  }

  try {
    const createdSchedules = schedulesRepository.create(userData)
    await schedulesRepository.save(createdSchedules)

    return createdSchedules
  } catch (error) {
    throw new AppError(error.message, 400)
  }
}

export default createSchedulesService
