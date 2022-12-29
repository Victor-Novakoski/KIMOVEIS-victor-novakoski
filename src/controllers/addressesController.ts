import { Request, Response } from 'express'
import { IAddressRequest } from '../interfaces/properties'
import createAddressService from '../services/addresses/createAddressService'


const createAddressesController = async(req: Request, res: Response) => {

    const address: IAddressRequest = req.body
    const userId = req.user.id
    const newAddress = await createAddressService(address, userId)
    return res.status(201).json(newAddress)

}

export { createAddressesController }