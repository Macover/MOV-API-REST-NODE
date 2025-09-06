//server.js

const express = require('express')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movie')
const crypto = require('node:crypto')

const app = express()

app.disable('x-powered-by')
app.use(express.json())

const ACEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://my-movies.com', //production url
  'http://my-movies.com',
]

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (ACEPTED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    )
    res.header('Access-Control-Allow-Headers', 'Content-Type')
  }
  next()
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMoviesByGenre = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )
    return res.status(200).json(filteredMoviesByGenre)
  } else {
    res.status(200).json(movies)
  }
})

// path to regex
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) {
    res.json(movie)
  } else {
    res.json({ error: 404, message: 'Resource not found' })
  }
})

app.post('/movies', (req, res) => {
  const commingMovie = req.body

  const result = validateMovie(commingMovie)

  if (result.success) {
    const newMovie = result.data
    //Emulating saving in a DB
    movies.push(newMovie)
    res.json({
      id: crypto.randomUUID(),
      ...newMovie,
    })
  } else {
    res
      .status(400)
      .json({ error: 400, message: JSON.parse(result.error.message) })
  }
})

app.put('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ error: 404, message: 'Movie not found' })
  }

  const result = validatePartialMovie(req.body)

  if (!result.success) {
    res
      .status(400)
      .json({ error: 400, message: JSON.parse(result.error.message) })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data,
  }

  movies[movieIndex] = updatedMovie
  res.status(200).json(updatedMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ error: 404, message: 'Movie not found' })
  }

  const result = validatePartialMovie(req.body)

  if (!result.success) {
    res
      .status(400)
      .json({ error: 400, message: JSON.parse(result.error.message) })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data,
  }

  movies[movieIndex] = updatedMovie
  res.status(200).json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params

  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 404, message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  res.json({ success: true, message: 'movie deleted' })
})

const PORT = process.env.PORT ?? 3002

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
