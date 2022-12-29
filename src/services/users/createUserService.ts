import AppDataSource from '../../data-source'
import User from '../../entities/userEntity'
import AppError from '../../errors/AppError'
import { IUser, IUserRequest } from '../../interfaces/users'
import { userReturnSerializer } from '../../serializers/userSerializer'

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
  try {
    const userRepository = AppDataSource.getRepository(User)
    const createdUser = userRepository.create(userData)

    await userRepository.save(createdUser)

    const userWithoutPassord = await userReturnSerializer.validate(
      createdUser,
      {
        stripUnknown: true,
      }
    )

    return userWithoutPassord
  } catch (error) {
    throw new AppError(error.message, 409)
  }
}

export default createUserService
