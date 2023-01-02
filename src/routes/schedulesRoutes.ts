import { Router } from 'express'
import {
  createSchedulesController,
  listAllSchedulesController,
} from '../controllers/schedulesController'
import ensureAuthMiddleware from '../middlewares/ensureAuthMiddleware'
import isAdminMiddleware from '../middlewares/isAdminMiddleware'
import validatedTimeAndDateMiddleware from '../middlewares/validatedTimeAndDateMiddleware'

const schedulesRoutes = Router()

schedulesRoutes.post('', ensureAuthMiddleware, 
validatedTimeAndDateMiddleware,
createSchedulesController)

schedulesRoutes.get('/properties/:id',ensureAuthMiddleware, isAdminMiddleware, listAllSchedulesController)

export default schedulesRoutes
