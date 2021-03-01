const prod = process.env.NODE_ENV === 'production'
module.exports = {
  'process.env.BACKEND_URL': prod ? 'https://wreck-house-press-back.herokuapp.com/' : "http://localhost:3001/"
}