import express from 'express'
import bodyParser from 'body-parser'
import apiRouter from './routes'
import { handleAuthError } from './middlewares/errorHandlers'
import { authenticate } from './middlewares/auth'
import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://beatboard-app.firebaseio.com',
})

const app = express()
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'development') {
  app.use(authenticate)
}
app.use(apiRouter)
app.use(handleAuthError)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
