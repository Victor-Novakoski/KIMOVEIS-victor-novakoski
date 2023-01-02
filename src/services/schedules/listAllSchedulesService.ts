import AppDataSource from '../../data-source'
import Property from '../../entities/propertiesEntity'
import Schedule from '../../entities/schedulesEntity'
import AppError from '../../errors/AppError'
import { IScheduleRequest } from '../../interfaces/schedules'

const listAllSchedulesService = async (propertyId: string): Promise<IScheduleRequest[]> => {
  try {
    const scheduleRepository = AppDataSource.getRepository(Schedule)
    const schedules = await scheduleRepository.createQueryBuilder('schedules').
    innerJoinAndSelect('schedules.properties', 'schedulesProp').
    where('properties.id = :propertyId', {propertyId: propertyId}).
    getMany()

    return schedules


  } catch (error) {
    throw new AppError(error.message, 404)
  }
}

export default listAllSchedulesService
