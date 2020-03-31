import { Request, Response, NextFunction } from 'express'
import { get, post } from './decorators/routes'
import { bodyValidator } from './decorators/bodyValidator'
import { controller } from './decorators/controller'

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form  method='POST'>
        <div>
          <label>Email</label>
          <input name='email'/>
        </div>
        <div>
          <label>Password</label>
          <input name='password' type='password'/>
        </div>
        <button>Submit</button>
      </form>
    `)
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body

    if(email && password && email === 'test@test.com' && password === 'password') {
      req.session = { loggedIn: true }
      res.redirect('/')
    } else {
      res.send('Invalid email or password')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined
    res.redirect('/')
  }
}
