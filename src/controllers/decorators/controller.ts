import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import { Methods } from './methods'
import { MetadataKeys } from './metadataKeys'

const router = AppRouter.getInstance()
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

    if(path) {
      router[method](
        `${routePrefix}${path}`,
        ...middlewares,
        routeHandler
      )
    }
  }
}
