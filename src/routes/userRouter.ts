import { Router } from 'express'
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from '../controllers/UsersController'
import isAdminMiddleware from '../middlewares/isAdminMiddleware'
import ensureAuthMiddleware from '../middlewares/ensureAuthMiddleware'
import ensureValidBodyMiddleware from '../middlewares/ensureValidBodyMiddleware'
import isActiveMiddleware from '../middlewares/isActiveMiddleware'
import isValidIdMiddleware from '../middlewares/isValidIdMiddleware'
import ensureValidBodyMiddlewarePatch from '../middlewares/ensureValidBodyMiddlewarePatch'
import {
  userSerializer,
  userUpdateSerializer,
} from '../serializers/userSerializer'
import validatedIsAdmMiddleware from '../middlewares/validatedIsAdmMiddleware'

const userRoutes = Router()

userRoutes.post(
  '',
  ensureValidBodyMiddleware(userSerializer),
  createUserController
)
userRoutes.get('', ensureAuthMiddleware, isAdminMiddleware, listUsersController)
userRoutes.delete(
  '/:id',
  ensureAuthMiddleware,
  isAdminMiddleware,
  isValidIdMiddleware,
  isActiveMiddleware,
  deleteUserController
)
userRoutes.patch(
  '/:id',
  ensureAuthMiddleware,
  isValidIdMiddleware,
  validatedIsAdmMiddleware,
  ensureValidBodyMiddlewarePatch(userUpdateSerializer),
  updateUserController
)

export default userRoutes
