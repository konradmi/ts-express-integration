import 'reflect-metadata'

export const get = (path: string) =>
  (target: any, key: string, desc: PropertyDescriptor  ) => {
    Reflect.defineMetadata('path', path, target, key)
  }
