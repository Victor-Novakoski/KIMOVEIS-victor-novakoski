import AppDataSource from '../../data-source'
import Categories from '../../entities/categoriesEntity'
import AppError from '../../errors/AppError'
import { ICategoryRequest } from '../../interfaces/categories'

const listCategoryService = async (): Promise<ICategoryRequest[]> => {
  try {
    const categoryRepository = AppDataSource.getRepository(Categories)
    const categories = await categoryRepository.find()

    return categories
  } catch (error) {
    throw new AppError(error.message, 404)
  }
}

export default listCategoryService
