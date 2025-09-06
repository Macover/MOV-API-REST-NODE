// routes/movies.js
import { Router } from "express";
import movies from '../movies.json' with {type: 'json'}
import { validateMovie, validatePartialMovie } from "../schemas/movie.js";
import randomUUID from 'node:crypto'


export const moviesRouter = Router();

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMoviesByGenre = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )
    return res.status(200).json(filteredMoviesByGenre)
  } else {
    return res.status(200).json(movies)
  }
})

// path to regex
moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) {
    return res.json(movie)
  } else {
    return res.json({ error: 404, message: 'Resource not found' })
  }
})

moviesRouter.post('/', (req, res) => {
  const commingMovie = req.body

  const result = validateMovie(commingMovie)

  if (result.success) {
    const newMovie = result.data
    //Emulating saving in a DB
    movies.push(newMovie)
    return res.json({
      id: randomUUID(),
      ...newMovie,
    })
  } else {
    res
      .status(400)
      .json({ error: 400, message: JSON.parse(result.error.message) })
  }
})

moviesRouter.put('/:id', (req, res) => {
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
  return res.status(200).json(updatedMovie)
})

moviesRouter.patch('/:id', (req, res) => {
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
  return res.status(200).json(updatedMovie)
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params

  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ error: 404, message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1);
  res.json({ success: true, message: 'movie deleted' })

})


