import { Request, Response } from 'express'
import createCategoryService from '../services/categories/createCategoryService'
import listCategoryService from '../services/categories/listCategoryService'

export const createCategoryController = async (
  req: Request,
  resp: Response
) => {
  
  const newCategory = await createCategoryService(req.body)
  return resp.status(201).json(newCategory)
}

export const listCategoryController = async (req: Request, resp: Response) => {
  const users = await listCategoryService()
  return resp.json(users)
}
