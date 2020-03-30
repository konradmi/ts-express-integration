import 'reflect-metadata'
import { RequestHandler } from 'express'

import { MetadataKeys } from './metadataKeys'

export const use = (middleware: RequestHandler) =>
  (target: any, key: string, desc: PropertyDescriptor) => {
    const middlewares = Reflect.getMetadata(
      MetadataKeys.middleware,
      target,
      key
    ) || []

    middlewares.push(middleware)

    Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, key)
  }

