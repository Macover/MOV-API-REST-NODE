//Models/MovieModel.js
import movies from '../movies.json' with {type: 'json'}
import { randomUUID } from 'node:crypto'

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const filteredMoviesByGenre = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
      return filteredMoviesByGenre
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    if (movie) return movie
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return false
    }

    const updatedMovie = {
      ...movies[movieIndex],
      ...input,
    }

    movies[movieIndex] = updatedMovie

    return updatedMovie
  }

  static async remove({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) {
      return false
    }
    const removedMovie = movies.splice(movieIndex, 1)
    return removedMovie
  }
}
