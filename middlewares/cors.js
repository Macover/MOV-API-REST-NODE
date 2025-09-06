// middlewares/cors.js
const ACEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://my-movies.com', //production url
  'http://my-movies.com',
]

// const callback =

export const customCors =
  ({ acceptedOrigins = ACEPTED_ORIGINS } = {}) =>
  (req, res, next) => {
    const origin = req.headers.origin
    if (acceptedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
      )
      res.header('Access-Control-Allow-Headers', 'Content-Type')
    }
    next()
  }
