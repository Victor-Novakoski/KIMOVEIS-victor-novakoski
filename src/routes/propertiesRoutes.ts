import { Router } from 'express'
import { createPropController, listPropController } from '../controllers/propertiesController'
import ensureAuthMiddleware from '../middlewares/ensureAuthMiddleware'
import isAdminMiddleware from '../middlewares/isAdminMiddleware'

const propertiesRoutes = Router()

propertiesRoutes.post(
  '',
  ensureAuthMiddleware,
  isAdminMiddleware,
  createPropController
)
propertiesRoutes.get('',listPropController)

export default propertiesRoutes
