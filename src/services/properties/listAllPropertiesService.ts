import AppDataSource from '../../data-source'
import Property from '../../entities/propertiesEntity'
import AppError from '../../errors/AppError'
import { IPropertyRequest } from '../../interfaces/properties'
import { usersReturnSerializer } from '../../serializers/userSerializer'

const listPropService = async (): Promise<Property[]> => {
  try {
    const propRepository = AppDataSource.getRepository(Property)
    const properties = await propRepository.find()

    return properties
  } catch (error) {
    throw new AppError(error.message, 404)
  }
}

export default listPropService
