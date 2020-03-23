import { Router, Request, Response } from 'express'

const router = Router()

router.get('/login', (req: Request, res: Response) => {
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
})

router.post('/login', (req: Request, res:Response) => {
  const { email, password } = req.body

  if(email && password && email === 'test@test.com' && password === 'password') {
    req.session = { loggedIn: true }
    res.redirect('/')
  } else {
    res.send('Invalid email or password')
  }
})

router.get('/', (req: Request, res: Response) => {
  if(req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>you are logged in</div>
        <a href='/logout'>Logout</a>
      </div>
    `)
  } else {
    res.send(`
      <div>
        <div>you are not logged in</div>
        <a href='/login'>Logout</a>
      </div>
    `)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined
  res.redirect('/')
})

export { router }
