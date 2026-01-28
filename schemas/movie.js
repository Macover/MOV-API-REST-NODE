// movie.js
import z from 'zod'

const movieSchema = z.object({
  title: z.string('Title shoudl be a string').max(40),
  release_year: z.number().min(1900).max(2025),
  director: z.string(),
  // duration: z.number().min(0),
  // poster: z.url().endsWith('.webp'),
  rating: z.number().min(0).max(10).optional(),
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
      'Fantasy'
    ])
    .array()
})

export const validatePartialMovie = (object) => {
  return movieSchema.partial().safeParse(object)
}

export const validateMovie = (movie) => {
  const data = movieSchema.safeParse(movie)
  return data
}
