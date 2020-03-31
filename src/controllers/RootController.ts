import { Request, Response, NextFunction } from 'express'
import { get } from './decorators/routes'
import { controller } from './decorators/controller'
import { use } from './decorators/use'

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if(req.session && req.session.loggedIn) {
    next()
    return
  }
  res.status(403).send('Not permitted')
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if(req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>you are logged in</div>
          <a href='/auth/logout'>Logout</a>
        </div>
      `)
    } else {
      res.send(`
        <div>
          <div>you are not logged in</div>
          <a href='/auth/login'>Logout</a>
        </div>
      `)
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route')
  }
}
