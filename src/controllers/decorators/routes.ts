import 'reflect-metadata'

import { Methods } from './methods'
import { MetadataKeys } from './metadataKeys'

const routeBinder = (method: string) => (path: string) => (target: any, key: string, desc: PropertyDescriptor  ) => {
  Reflect.defineMetadata(MetadataKeys.path, path, target, key)
  Reflect.defineMetadata(MetadataKeys.method, method, target, key)
}

export const get = routeBinder(Methods.get)
export const put = routeBinder(Methods.put)
export const del = routeBinder(Methods.del)
export const patch = routeBinder(Methods.patch)
