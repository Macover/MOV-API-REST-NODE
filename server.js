import express, { json } from 'express'
import { createRouter } from './routes/movies.js'
import { MovieModel } from './models/mysql/MovieModel.js'
import { customCors } from './middlewares/cors.js'

const app = express()

app.disable('x-powered-by')
app.use(json())

// app.use(
//   customCors([
//     'http://127.0.0.1:3000', // Dev url
//     'https://my-movies.com', //production url
//   ])
// )

app.use(customCors())

app.use('/movies', createRouter({ MovieModel }))

const PORT = process.env.PORT ?? 3002

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`)
})
