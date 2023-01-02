import AppDataSource from '../../data-source'
import Property from '../../entities/propertiesEntity'
import Schedules from '../../entities/schedulesEntity'
import AppError from '../../errors/AppError'
import { IScheduleRequest } from '../../interfaces/schedules'

const conflictSchedule = async (data: IScheduleRequest ): Promise<Boolean> => {
  const schedulesRepository = AppDataSource.getRepository(Schedules)

  const scheduleSamePropertyAndDatetime = await schedulesRepository.findBy({
    date: data.date,
    hour: data.hour,
    propertyId: data.propertyId,
  })
  if(scheduleSamePropertyAndDatetime.length) return true
  
  const scheduleSameUserAndDateTime = await schedulesRepository.findBy({
    date: data.date,
    hour: data.hour,
    userId: data.userId,
  })
  if(scheduleSameUserAndDateTime.length) return true

  return false
}

const invalidHourSchedule = async (data: IScheduleRequest): Promise<Boolean> => {
  const STARTING_HOUR = 8
  const ENDING_HOUR = 18
  const hour = parseInt(data.hour.split(':')[0])

  if(hour < STARTING_HOUR) return true
  if(hour >= ENDING_HOUR) return true

  return false
}
const invalidPropertyId = async (propertyId: string): Promise<Boolean> => {
  const propertyRepository = AppDataSource.getRepository(Property)
  const property = await propertyRepository.findOneBy({
    id: propertyId
  })

  return !property
}

const createSchedulesService = async (userData: IScheduleRequest): Promise<Schedules> => {  
  const conflict = await conflictSchedule(userData)
  
  const invalidHour = await invalidHourSchedule(userData)
  const invalidProperty = await invalidPropertyId(userData.propertyId)

  if(invalidProperty) {
    throw new AppError("Invalid Property!", 404)
  }

  if(conflict){
    throw new AppError("Schedule already exists!", 409)
  }
  if(invalidHour){
    throw new AppError("Invalid Hour!", 400)
  }

  const schedulesRepository = AppDataSource.getRepository(Schedules)

  try {
    const createdSchedules = schedulesRepository.create(userData)
    await schedulesRepository.save(createdSchedules)

    return createdSchedules
  } catch (error) {
    throw new AppError(error.message, 400)
  }
}

export default createSchedulesService
