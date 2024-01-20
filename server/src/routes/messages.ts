import express from 'express'
import { MessageService } from '../services/messages'

const router = express.Router()

router.post(
  '/send',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const messageService = new MessageService()
      const apiResponse = await messageService.sendMessage(req.body)
      res.status(apiResponse.status).send(apiResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)

router.post(
  '/users',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const messageService = new MessageService()
      const apiResponse = await messageService.getUsersWhoSentMessages(
        req.body.organId
      )
      res.status(apiResponse.status).send(apiResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)

router.post(
  '/conversation',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const messageService = new MessageService()
      const apiResponse = await messageService.getMessagesForOrganForIndividual(
        req.body.organId,
        req.body.userId
      )
      res.status(apiResponse.status).send(apiResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)

export const messageRouter = router
