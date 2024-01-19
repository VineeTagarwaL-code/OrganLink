import express from 'express'
import { DashboardUserService } from '../services/dashboardUsers'

const router = express.Router()

router.get(
  '/:id',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userService = new DashboardUserService()
      const apiResponse = await userService.getUserDetails(req.params['id'])
      res.status(apiResponse.status).send(apiResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)

router.post(
  '/all',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userService = new DashboardUserService()
      const apiResponse = await userService.getAllUsers(req.body.users)
      res.status(apiResponse.status).send(apiResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)

export const userRouter = router
