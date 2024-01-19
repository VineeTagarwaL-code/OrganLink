import express from 'express'
const router = express.Router()

router.post(
  '/register',
  async (req: express.Request, res: express.Response) => {
    const accountService = new AccountService()
  }
)


