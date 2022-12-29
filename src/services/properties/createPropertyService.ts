import AppDataSource from '../../data-source'
import Addresses from '../../entities/addressesEntity'
import Category from '../../entities/categoriesEntity'
import Property from '../../entities/propertiesEntity'
import AppError from '../../errors/AppError'
import { IAddressRequest, IPropertyRequest } from '../../interfaces/properties'

const createPropService = async (
  propData: IPropertyRequest,
  categoryId: string,
  addressData:IAddressRequest 
): Promise<Property> => {
  // try {
    const propRepository = AppDataSource.getRepository(Property)
    const categoryRepository = AppDataSource.getRepository(Category)
    const addressRepository = AppDataSource.getRepository(Addresses)

    const category = await categoryRepository.findOneBy({
      id: categoryId,
    })

    if(!category){
      throw new AppError("category not found", 404)
    }

    const propExist = await addressRepository.findOneBy({
      district: addressData.district,
      zipCode: addressData.zipCode,
      number: addressData.number,
      city: addressData.city,
      state: addressData.state,
    })

    if(addressData.zipCode.length > 8){
      throw new AppError("zipCode invalid", 400)
    }
    
    if(addressData.state.length > 2){
      throw new AppError("state invalid", 400)
    }
  
    if(propExist){
      throw new AppError("Address already exists", 409)
    }
  
    const newAddress = addressRepository.create(addressData)
    await addressRepository.save(newAddress)
    
    
    const createdProp = propRepository.create({
      ...propData,
      address: newAddress,
      category
    })
    
    await propRepository.save(createdProp)
    
    return createdProp
  // } catch (error) {
  //   throw new AppError('error.message', 409)
  // }
}

export default createPropService
