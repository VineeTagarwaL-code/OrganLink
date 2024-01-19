import express from 'express'
import { FileService } from '../services/files'

const router = express.Router()

router.post(
  '/upload',
  async (req: express.Request, res: express.Response, next) => {
    try {
      const fileService = new FileService()
      await fileService.uploadFiles(req, res)
    } catch (err) {
      next(err)
    }
  }
)

export const fileRouter = router
