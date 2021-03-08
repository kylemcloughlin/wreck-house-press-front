const prod = process.env.NODE_ENV === 'production'
module.exports = {
  'process.env.BACKEND_URL': prod ? "http://localhost:3001/": "https://wreck-house-press-back.herokuapp.com'"
}