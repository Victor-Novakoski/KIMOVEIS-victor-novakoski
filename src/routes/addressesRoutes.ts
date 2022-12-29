import { Router } from 'express'
import { createAddressesController } from '../controllers/addressesController'

const addressesRoutes = Router()

addressesRoutes.post('', createAddressesController)

export default addressesRoutes
