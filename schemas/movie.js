//movie.js
const z = require('zod')

const movieSchema = z.object({
  title: z.string('Title shoudl be a string').max(40),
  year: z.number().min(1900).max(2025),
  director: z.string(),
  duration: z.number().min(0),
  poster: z.url().endsWith('.webp'),
  rate: z.number().min(0).max(10).optional(),
  genre: z
    .enum([
      'Action',
      'Crime',
      'Drama',
      'Adventure',
      'Sci-Fi',
      'Romance',
      'Animation',
      'Biography',
      'Fantasy',
    ])
    .array(),
})

const validatePartialMovie = (object) => {
  return movieSchema.partial().safeParse(object)
}

const validateMovie = (movie) => {
  const data = movieSchema.safeParse(movie)
  return data
}

module.exports = { validateMovie, validatePartialMovie }
