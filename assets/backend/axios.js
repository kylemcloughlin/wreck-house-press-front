import axios from 'axios'
//  import dotenv from 'dotenv'
//  import 'fs'
//  dotenv.config()
console.log('hitting axios????', process.env.BACKEND_URL)

const API_URL = process.env.BACKEND_URL

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})


const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase();
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf
    }
  }
  return config;
})

securedAxiosInstance.interceptors.response.use(null, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    return plainAxiosInstance.post('/refresh', {}, {
        headers: {
          'X-CRSF-TOKEN': localStorage.csrf
        }
      })
      .then(response => {
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true

        let retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf
        return plainAxiosInstance.request(retryConfig)
      }).catch(error => {
        delete localStorage.csrf
        delete localStorage.signedIn

        location.replace('/')
        return Promise.reject(error)

      })
  } else {
    return Promise.reject(error)
  }
})

export {
  securedAxiosInstance,
  plainAxiosInstance
}