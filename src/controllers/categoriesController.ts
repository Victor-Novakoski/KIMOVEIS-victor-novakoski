import { Request, Response } from 'express'
import createCategoryService from '../services/categories/createCategoryService'
import listCategoriesIdPropService from '../services/categories/listCategoriesIdPropService'
import listCategoryService from '../services/categories/listCategoryService'

export const createCategoryController = async (req: Request,resp: Response) => {
  const newCategory = await createCategoryService(req.body)
  return resp.status(201).json(newCategory)
}

export const listCategoryController = async (req: Request, resp: Response) => {
  const categories = await listCategoryService()
  return resp.json(categories)
}
export const listCategoriesIdPropController = async (req: Request, resp: Response) => {
  const categoriesProp = await listCategoriesIdPropService(req.params.id)
  return resp.json(categoriesProp)
}
