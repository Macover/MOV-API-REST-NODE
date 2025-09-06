// routes/movies.js
import { Router } from 'express'
import { MovieController } from '../controllers/MovieController.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.handleAllMoviesAsync)

moviesRouter.get('/:id', MovieController.handleMoviesByIdAsync)

moviesRouter.post('/', MovieController.handleCreateMovieAsync)

moviesRouter.put('/:id', MovieController.handleUpdateMovieAsync)

moviesRouter.patch('/:id', MovieController.handleUpdateMovieAsync)

moviesRouter.delete('/:id', MovieController.handleDeleteMovieAsync)
