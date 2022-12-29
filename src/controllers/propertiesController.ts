import { Request, Response } from 'express'
import { IPropertyRequest } from '../interfaces/properties'
import createPropService from '../services/properties/createPropertyService'

const createPropController = async (req: Request, resp: Response) => {
  const prop: IPropertyRequest = req.body
   console.log(resp.body)
  const newProp = await createPropService(prop)
  return resp.status(201).json(newProp)
}

export { createPropController }
