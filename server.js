//server.js

import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { customCors } from './middlewares/cors.js'

const app = express()

app.disable('x-powered-by')
app.use(json())

app.use(customCors)

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3002

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`)
})
