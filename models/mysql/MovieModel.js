// Models/MovieModel.js
import mysql from 'mysql2/promise'

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'movies_db'
})

export class MovieModel {
  static async getAll ({ genre }) {
    const [results] = await connection.query(
      'SELECT * FROM movies'
    )
    return results
  }

  static async getById ({ id }) {
    const [results] = await connection.query(
      'SELECT * FROM movies WHERE id = ?',
      [id]
    )
    if (results.length > 0) {
      return results[0]
    }
  }

  static async create ({ input }) {
    const { title, director, releaseYear, genre, rating } = input

    console.log({ input })

    const [result] = await connection.query(
      'INSERT INTO movies (title, director, release_year, genre, rating) VALUES (?, ?, ?, ?, ?)',
      [title, director, releaseYear, genre, rating]
    )

    const newMovieId = result.insertId

    const [newMovieRows] = await connection.query(
      'SELECT * FROM movies WHERE id = ?',
      [newMovieId]
    )

    return newMovieRows[0]
  }

  static async update ({ id, input }) {
    const fields = []
    const values = []

    for (const [key, value] of Object.entries(input)) {
      fields.push(`${key} = ?`)
      values.push(value)
    }

    values.push(id)

    const [result] = await connection.query(
      `UPDATE movies SET ${fields.join(', ')} WHERE id = ?`,
      values
    )
    if (result.affectedRows === 0) {
      return false
    }

    const [updatedMovieRows] = await connection.query(
      'SELECT * FROM movies WHERE id = ?',
      [id]
    )

    return updatedMovieRows[0]
  }

  static async remove ({ id }) {
    const [movieDeleted] = await connection.query(
      'SELECT * FROM movies WHERE id = ?',
      [id]
    )
    const [result] = await connection.query(
      'DELETE FROM movies WHERE id = ?',
      [id]
    )
    if (result.affectedRows === 0) {
      return false
    }
    return movieDeleted[0]
  }
}
