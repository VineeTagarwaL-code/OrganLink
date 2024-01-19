import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use('/api/v1/accounts', accountHandler)
