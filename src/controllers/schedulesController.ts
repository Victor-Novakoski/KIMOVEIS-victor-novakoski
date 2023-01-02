import { Request, Response } from 'express'
import createSchedulesService from '../services/schedules/createSchedulesService'
import listAllSchedulesService from '../services/schedules/listAllSchedulesService'

export const createSchedulesController = async (
  req: Request,
  resp: Response
) => {
  await createSchedulesService(req.body)
  return resp.status(201).json({ message: 'Schedule created' })
}

export const listAllSchedulesController = async (
  req: Request,
  resp: Response
) => {
  await listAllSchedulesService(req.body.propertyId)
  return resp.status(201)
}
