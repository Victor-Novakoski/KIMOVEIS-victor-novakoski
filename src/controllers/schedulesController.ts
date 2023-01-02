import { Request, Response } from 'express'
import createSchedulesService from '../services/schedules/createSchedulesService'
import listAllSchedulesService from '../services/schedules/listAllSchedulesService'

export const createSchedulesController = async (
  req: Request,
  resp: Response
) => {
  req.body.userId = req.user.id

  await createSchedulesService(req.body)
  return resp.status(201).json({ message: 'Schedule created' })
}

export const listAllSchedulesController = async (
  req: Request,
  resp: Response
) => {
  const schedules = await listAllSchedulesService(req.params.id)
  return resp.status(200).json({schedules})
}
