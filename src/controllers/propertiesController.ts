import { Request, Response } from 'express'
import { IPropertyRequest } from '../interfaces/properties'
import createPropService from '../services/properties/createPropertyService'
import listPropService from '../services/properties/listAllPropertiesService'

export const createPropController = async (req: Request, resp: Response) => {
  const prop: IPropertyRequest = req.body
  const categoryId = req.body.categoryId
  const address = req.body.address
  const newProp = await createPropService(prop, categoryId, address)
  return resp.status(201).json(newProp)
}

export const listPropController = async (req: Request, resp: Response) => {
  const users = await listPropService()
  return resp.json(users)
}


