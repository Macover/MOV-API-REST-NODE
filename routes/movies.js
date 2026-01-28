import { Router } from 'express'
import { MovieController } from '../controllers/MovieController.js'

export const createRouter = ({ MovieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ MovieModel })

  moviesRouter.get('/', movieController.handleAllMoviesAsync)

  moviesRouter.get('/:id', movieController.handleMoviesByIdAsync)

  moviesRouter.post('/', movieController.handleCreateMovieAsync)

  moviesRouter.put('/:id', movieController.handleUpdateMovieAsync)

  moviesRouter.patch('/:id', movieController.handleUpdateMovieAsync)

  moviesRouter.delete('/:id', movieController.handleDeleteMovieAsync)

  return moviesRouter
}
