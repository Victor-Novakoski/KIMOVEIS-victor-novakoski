import { Router } from 'express'
import {
  createSchedulesController,
  listAllSchedulesController,
} from '../controllers/schedulesController'
import ensureAuthMiddleware from '../middlewares/ensureAuthMiddleware'
import isAdminMiddleware from '../middlewares/isAdminMiddleware'

const schedulesRoutes = Router()

schedulesRoutes.post('', ensureAuthMiddleware, createSchedulesController)

schedulesRoutes.get('properties/:id', listAllSchedulesController)

export default schedulesRoutes
