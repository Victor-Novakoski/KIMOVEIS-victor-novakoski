import AppDataSource from '../../data-source'
import Category from '../../entities/categoriesEntity'
import Property from '../../entities/propertiesEntity'
import AppError from '../../errors/AppError'
import { ICategoryRequest } from '../../interfaces/categories'

const listCategoriesIdPropService = async (
  categoryId: string
): Promise<ICategoryRequest> => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category)

    const categories = await categoryRepository.findOne({
      where: { id: categoryId },
      relations: { properties: true },
    })

    if(!categories){
      throw new AppError('category not found!', 404)
    }
    // const categories = await categoryRepository.createQueryBuilder('categories').
    // innerJoinAndSelect('categories.properties', 'categoryProps').
    // innerJoinAndSelect('categoryProps.address', 'addressesProps').
    // where('categories.id = :categoryId', {categoryId: categoryId}).
    // getMany()
    // console.log(categories)

    // const categories = await categoryRepository.createQueryBuilder('properties').
    // innerJoinAndSelect('properties.category', 'categoryProps').
    // where('properties.id = :propertiesId', {propertiesId: categoryId}).
    // select(['projects.id as id_projeto', 'technologiesToProjects', 'technologies']).
    // getMany()

    return categories
  } catch (error) {
    throw new AppError(error.message, 404)
  }
}

export default listCategoriesIdPropService
