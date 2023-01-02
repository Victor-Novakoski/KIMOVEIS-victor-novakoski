import { Router } from 'express'
import {
  createCategoryController,
  listCategoriesIdPropController,
  listCategoryController,
} from '../controllers/categoriesController'
import ensureAuthMiddleware from '../middlewares/ensureAuthMiddleware'
import isAdminMiddleware from '../middlewares/isAdminMiddleware'

const categoriesRoutes = Router()

categoriesRoutes.post(
  '',
  ensureAuthMiddleware,
  isAdminMiddleware,
  createCategoryController
)
categoriesRoutes.get('', listCategoryController)
categoriesRoutes.get('/:id/properties',listCategoriesIdPropController)

export default categoriesRoutes
