import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import { accountRouter } from './routes/accounts'
import { connectToDb } from './database/connectToDb'
import { App as appConfig } from './config/appConfig'

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use('/api/v1/accounts', accountRouter)

// Error handler middleware
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error) {
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
