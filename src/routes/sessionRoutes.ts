import { Router } from 'express'
import { createSessionController } from '../controllers/sessionControllers'

const sessionRoutes = Router()

sessionRoutes.post('', createSessionController)

export default sessionRoutes
