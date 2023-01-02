import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const ensureAuthMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  let authorization = req.headers.authorization

  if (!authorization) {
    return resp.status(401).json({
      message: 'Invalid token',
    })
  }

  authorization = authorization.split(' ')[1]

  jwt.verify(
    authorization,
    process.env.SECRET_KEY,
    (error: any, decoded: any) => {
      if (error) {
        return resp.status(401).json({
          message: error.message,
        })
      }

      req.user= {
        isAdm:decoded.isAdm,
        id: decoded.sub,
      }

      return next()
    }
  )
}

export default ensureAuthMiddleware
