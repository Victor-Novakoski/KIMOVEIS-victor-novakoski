import { Router } from 'express'
import { createCategoryController, listCategoryController } from '../controllers/categoriesController'
import ensureAuthMiddleware from '../middlewares/ensureAuthMiddleware'
import isAdminMiddleware from '../middlewares/isAdminMiddleware'
import validatedIsAdmMiddleware from '../middlewares/validatedIsAdmMiddleware'

const categoriesRoutes = Router()

categoriesRoutes.post('', ensureAuthMiddleware, createCategoryController)
categoriesRoutes.get('', listCategoryController)
categoriesRoutes.get('/:id/properties')

export default categoriesRoutes
