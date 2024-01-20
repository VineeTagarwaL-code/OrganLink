import express, { NextFunction } from 'express'
import { AnnouncementService } from '../services/announcements'

const router = express.Router()

router.post(
  '/',
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const announcementService = new AnnouncementService()
      console.log('check 0')
      const response = await announcementService.createAnnouncement(req.body)
      return res.status(response.status).send(response.data)
    } catch (err) {
      console.error(err)
      next(err)
    }
  }
)

router.get(
  '/',
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const announcementService = new AnnouncementService()
      const response = await announcementService.getAnnouncements()
      return res.status(response.status).send(response.data)
    } catch (err) {
      console.error(err)
      next(err)
    }
  }
)

export const announcementRouter = router
