// routes/movies.js
import { Router } from 'express'
import { validateMovie, validatePartialMovie } from '../schemas/movie.js'
import { MovieModel } from '../models/MovieModel.js'

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
  const { genre } = req.query
  const movies = await MovieModel.getAll({ genre })
  return res.status(200).json(movies)
})

moviesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.getById({ id })
  if (movie) return res.status(200).json(movie)
  return res.status(200).json({ error: 404, message: 'Resource not found' })
})

moviesRouter.post('/', async (req, res) => {
  const input = req.body
  const result = validateMovie(input)
  if (result.success) {
    const newMovie = await MovieModel.create({ input: result.data })
    return res.status(201).json(newMovie)
  }
  return res
    .status(400)
    .json({ error: 400, message: JSON.parse(result.error.message) })
})

moviesRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)
  if (result.error) {
    return res
      .status(400)
      .json({ error: 400, message: JSON.parse(result.error.message) })
  }
  if (result.success) {
    const isMovie = await MovieModel.update({ id, input: result.data })
    if (isMovie) {
      const updatedMovie = isMovie
      return res.status(200).json(updatedMovie)
    }
    return res.status(404).json({ error: 404, message: 'Movie not found' })
  }
})

moviesRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)
  if (result.error) {
    return res
      .status(400)
      .json({ error: 400, message: JSON.parse(result.error.message) })
  }
  if (result.success) {
    const isMovie = await MovieModel.update({ id, input: result.data })
    if (isMovie) {
      const updatedMovie = isMovie
      return res.status(200).json(updatedMovie)
    }
    return res.status(404).json({ error: 404, message: 'Movie not found' })
  }
})

moviesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  const isMovie = await MovieModel.remove({ id })

  if (!isMovie) {
    return res.status(404).json({ error: 404, message: 'Movie not found' })
  }

  return res.status(200).json({
    success: true,
    message: 'Movie deleted successfully',
    movie: isMovie,
  })
})
