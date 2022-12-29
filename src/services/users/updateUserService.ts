import AppDataSource from '../../data-source'
import User from '../../entities/userEntity'
import AppError from '../../errors/AppError'
import { IUser, IUserUpdate } from '../../interfaces/users'
import { userReturnSerializer } from '../../serializers/userSerializer'

const updateUserService = async (userData: IUserUpdate, userId: string):Promise<IUser> => {
  try {
    const userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOneBy({
      id: userId,
    })
    const updatedUser = userRepository.create({
      ...findUser,
      ...userData,
    })
    await userRepository.save(updatedUser)

    const updatedUserWithoutPassword = await userReturnSerializer.validate(
      updatedUser,
      {
        stripUnknown: true,
      }
    )

    return updatedUserWithoutPassword
  } catch (error) {
    throw new AppError(error.message, 404)
  }
}

export default updateUserService
