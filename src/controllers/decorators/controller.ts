import 'reflect-metadata'
import { Request, Response, NextFunction, RequestHandler } from 'express'

import { AppRouter } from '../../AppRouter'
import { Methods } from './methods'
import { MetadataKeys } from './metadataKeys'

const router = AppRouter.getInstance()

const bodyValidators = (keys: string): RequestHandler =>
  (req: Request, res:Response, next: NextFunction) => {
    if(!req.body) {
      res.status(422).send('Invalid request')
      return
    }

    for(let key of keys) {
      if(!req.body[key]) {
        res.status(422).send('Invalid request')
        return
      }
    }

    next()
  }


export const controller = (routePrefix: string) => (target: Function) => {
  for(let key in target.prototype) {
    const routeHandler = target.prototype[key]

    const path = Reflect.getMetadata(
      MetadataKeys.path,
      target.prototype,
      key
    )

    const method: Methods = Reflect.getMetadata(
      MetadataKeys.method,
      target.prototype,
      key
    )

    const middlewares = Reflect.getMetadata(
      MetadataKeys.middleware,
      target.prototype,
      key
    ) || []

    const requiredBodyProps = Reflect.getMetadata(
      MetadataKeys.validator,
      target.prototype,
      key
    ) || []

    const validator = bodyValidators(requiredBodyProps)

    if(path) {
      router[method](
        `${routePrefix}${path}`,
        ...middlewares,
        validator,
        routeHandler
      )
    }
  }
}
