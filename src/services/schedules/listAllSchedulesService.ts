import AppDataSource from '../../data-source'
import Property from '../../entities/propertiesEntity'
import Schedule from '../../entities/schedulesEntity'
import AppError from '../../errors/AppError'
import { IScheduleRequest } from '../../interfaces/schedules'

const listAllSchedulesService = async (propertyId: string): Promise<Schedule[]> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule)
  const propertyRepository = AppDataSource.getRepository(Property)
  
  const property = await propertyRepository.findOneById(propertyId)
  
  if (!property) {
    throw new AppError('Property not found', 404)
  }
  
  const schedule = await scheduleRepository.createQueryBuilder('schedules').
  innerJoinAndSelect('schedules.user', 'user').
  where('schedules.propertyId = :property', {property: propertyId}).
  getMany()

  return schedule
}

export default listAllSchedulesService
