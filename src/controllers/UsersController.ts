import { Request, Response } from 'express'
import createUserService from '../services/users/createUserService'
import deleteUserService from '../services/users/deleteUsersService'
import listUsersService from '../services/users/listUsersService'
import updateUserService from '../services/users/updateUserService'

export const createUserController = async (req: Request, resp: Response) => {
  const newUser = await createUserService(req.body)
  return resp.status(201).json(newUser)
}

export const listUsersController = async (req: Request, resp: Response) => {
  const users = await listUsersService()
  return resp.json(users)
}

export const deleteUserController = async (req: Request, resp: Response) => {
  await deleteUserService(req.params.id)
  return resp.status(204).send()
}

export const updateUserController = async (req: Request, resp: Response) => {
  const updatedUser = await updateUserService(req.body, req.params.id)
  return resp.json(updatedUser)
}
