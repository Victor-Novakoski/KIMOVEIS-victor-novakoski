import AppDataSource from '../../data-source'
import User from '../../entities/userEntity'
import AppError from '../../errors/AppError'
import { IUser } from '../../interfaces/users'
import { usersReturnSerializer } from '../../serializers/userSerializer'

const listUsersService = async (): Promise<IUser[]> => {
  try {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const userWithoutPassord = await usersReturnSerializer.validate(users, {
      stripUnknown: true,
    })

    return userWithoutPassord
  } catch (error) {
    throw new AppError(error.message, 404)
  }
}

export default listUsersService
