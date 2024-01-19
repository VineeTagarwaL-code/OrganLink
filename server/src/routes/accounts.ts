import express, { NextFunction } from 'express'
import { AccountService } from '../services/accounts'
const router = express.Router()

router.post(
  '/register',
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const accountService = new AccountService()
      const response = await accountService.registerAccount(req.body)
      return res.status(response.status).send(response.data)
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  '/login',
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const accountService = new AccountService()
      const response = await accountService.loginUser(
        req.body.email,
        req.body.password
      )
      return res.status(response.status).send(response.data)
    } catch (err) {
      next(err)
    }
  }
)

export const accountRouter = router
