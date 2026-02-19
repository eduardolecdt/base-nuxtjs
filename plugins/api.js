import axios from 'axios'

export default defineNuxtPlugin(() => {
  const BASE_URL = 'http://localhost:3000'

  const request = (config) => {
    return new Promise((resolve, reject) => {
      axios(config)
        .then((response) => resolve(response?.data?.body))
        .catch((error) => reject(error?.response?.data?.body))
    })
  }

  const api = (method = 'GET', url, data = null) => {
    const config = {
      method,
      url: `${BASE_URL}/${url}`,
      timeout: 5000
    }
    if (data) config.data = data
    return request(config)
  }

  return {
    provide: {
      api
    }
  }
})
