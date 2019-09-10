import express from 'express'
import bodyParser from 'body-parser'
// import loginRoute from './routes/login'

const app = express()
app.use(bodyParser.json())
// app.use('/', loginRoute)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
