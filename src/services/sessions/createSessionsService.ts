import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import AppDataSource from '../../data-source'
import 'dotenv/config'
import { IUserLogin } from '../../interfaces/users'
import User from '../../entities/userEntity'
import AppError from '../../errors/AppError'

const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({
    email: email,
  })

  if (!user.isActive ) {
    throw new AppError('User not fould', 400)
  }

  if (!user) {
    throw new AppError('User or password invalid', 403)
  }

  const passwordMatch = await compare(password, user.password)
  if (!passwordMatch) {
    throw new AppError('User or password invalid', 403)
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY,
    {
      subject: String(user.id),
      expiresIn: '24h',
    }
  )

  return token
}

export default createSessionService
