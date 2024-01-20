import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import { accountRouter } from './routes/accounts'
import { connectToDb } from './database/connectToDb'
import { App as appConfig } from './config/appConfig'
import { userRouter } from './routes/users'
import { verifyToken } from './middleware/verifyToken'
import { organRouter } from './routes/organs'
import { messageRouter } from './routes/messages'
import { fileRouter } from './routes/files'
import { adminRouter } from './routes/admin'
import { verifyIsAdmin } from './middleware/verifyIsAdmin'
import { announcementRouter } from './routes/announcements'

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyparser.json())

// unauthenticated routes
app.use('/api/v1/accounts', accountRouter)

// authenticated routes
app.use(verifyToken)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/organs', organRouter)
app.use('/api/v1/files', fileRouter)

app.use('/api/v1/admin', verifyIsAdmin, adminRouter)

app.use('/api/v1/messages', messageRouter)
app.use('/api/v1/announcements', announcementRouter)

// Error handler middleware
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error) {
      console.log(error)
      res.status(500).send({ error: 'Internal Server Error' })
    }
  }
)
const startServer = async () => {
  try {
    await connectToDb()
    app.listen(appConfig.port, () => {
      console.log(`Server listening on ${appConfig.port}`)
    })
  } catch (error: any) {
    console.log('something went wrong ', error)
  }
}

startServer()
