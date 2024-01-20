import express from 'express'
import { AdminService } from '../controllers/adminService'

const router = express.Router()

router.get(
  '/requests',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const adminService = new AdminService()
      const apiResponse = await adminService.getRequests()
      res.status(apiResponse.status).send(apiResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)

router.post(
  '/approve',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const adminService = new AdminService()
      const apiResponse = await adminService.verifyRequests(req.body.ids)
      res.status(apiResponse.status).send(apiResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)

export const adminRouter = router
