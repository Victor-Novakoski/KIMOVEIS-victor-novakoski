import AppDataSource from '../../data-source'
import Categories from '../../entities/categoriesEntity'
import Properties from '../../entities/propertiesEntity'
import AppError from '../../errors/AppError'
import { IPropertyRequest } from '../../interfaces/properties'

const createPropService = async (
  propData: IPropertyRequest
): Promise<Properties> => {
  try {
    const propRepository = AppDataSource.getRepository(Properties)
    const categoryRepository = AppDataSource.getRepository(Categories)

    // const category = await categoryRepository.findOneBy({
    //   id: categoryId,
    // })

    // const createdProp = propRepository.create({
    //   ...propData,
    //   category
    // })
     const createdProp = propRepository.create(propData)
    //  console.log(propData)
    // console.log(createdProp)

    await propRepository.save(createdProp)

    return createdProp
  } catch (error) {
    throw new AppError(error.message, 409)
  }
}

export default createPropService
