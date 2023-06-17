import config from './utils/config'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import codeRouter from './router/code'
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', codeRouter)

app.listen(config.port, () => {
  console.log(`nia-code server running at http://localhost:${config.port}`)
})
