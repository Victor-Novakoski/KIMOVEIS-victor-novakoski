import AppDataSource from '../../data-source'
import Category from '../../entities/categoriesEntity'
import AppError from '../../errors/AppError'
import { ICategoryRequest } from '../../interfaces/categories'

const createCategoryService = async (name: ICategoryRequest): Promise<ICategoryRequest> => {
    try {
        
        // const propRepository = AppDataSource.getRepository(Properties)
        const categoryRepository = AppDataSource.getRepository(Category)
    
        const createdCategory = categoryRepository.create(name)
        await categoryRepository.save(createdCategory)
    
    //     await propRepository.update(
    //       {
    //           id: propId
    //       },
    //       {
    //           address: createdCategory
    //       }
    //   )
    
        return createdCategory
    } catch (error) {
        throw new AppError(error.message, 409)
    }


}

export default createCategoryService
