import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import apiRouter from './routes'
import {
  handleAuthError,
  handleBadRequestError,
  handleDefaultError,
} from './middlewares/errorHandlers'
import { authenticate } from './middlewares/auth'
import { createConnection } from 'typeorm'
import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://beatboard-app.firebaseio.com',
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

if (['development', 'debug'].indexOf(process.env.NODE_ENV as string) == -1) {
  app.use(authenticate)
}
app.use(apiRouter)
app.use(handleAuthError)
app.use(handleBadRequestError)
app.use(handleDefaultError)

async function startServer(): Promise<void> {
  await createConnection()
  app.listen(8080, () => {
    console.log('Server running on port 8080')
  })
}

startServer().catch(e => console.log(e))
