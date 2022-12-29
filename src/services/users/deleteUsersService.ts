import AppDataSource from '../../data-source'
import User from '../../entities/userEntity'
import AppError from '../../errors/AppError'

const deleteUserService = async (user_id: string) => {
  const userRepo = AppDataSource.getRepository(User)
  const user = await userRepo.findOneBy({ id: user_id })
  user.isActive = false
  await userRepo.save(user)
}

export default deleteUserService
