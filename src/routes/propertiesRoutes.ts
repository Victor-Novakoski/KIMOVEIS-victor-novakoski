import { Router } from 'express'
import { createPropController } from '../controllers/propertiesController'

const propertiesRoutes = Router()

propertiesRoutes.post('',createPropController)
propertiesRoutes.get('')

export default propertiesRoutes
