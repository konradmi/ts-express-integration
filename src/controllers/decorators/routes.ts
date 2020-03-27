import 'reflect-metadata'

import { Methods } from './methods'

const routeBinder = (method: string) => (path: string) => (target: any, key: string, desc: PropertyDescriptor  ) => {
  Reflect.defineMetadata('path', path, target, key)
  Reflect.defineMetadata('method', method, target, key)
}

export const get = routeBinder(Methods.get)
export const put = routeBinder(Methods.put)
export const del = routeBinder(Methods.del)
export const patch = routeBinder(Methods.patch)
