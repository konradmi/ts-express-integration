import 'reflect-metadata'

import { MetadataKeys } from './metadataKeys'

export const bodyValidator = (...keys: string[]) =>
  (target: any, key: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key)
  }
