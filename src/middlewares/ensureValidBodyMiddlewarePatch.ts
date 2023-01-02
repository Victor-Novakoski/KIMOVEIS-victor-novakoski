import { Request, Response, NextFunction } from 'express'
import { AnySchema } from 'yup'
import AppError from '../errors/AppError'

const ensureValidBodyMiddlewarePatch = (schema: AnySchema) => async (req: Request, resp: Response, next: NextFunction) => {
  const validated = await schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })

  if(Object.keys(validated).length == 0) {
    throw new AppError('user not fould', 401)
  }
  
  req.body = validated
  return next()
  }

export default ensureValidBodyMiddlewarePatch
