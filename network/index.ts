/** @format */

import axios from 'axios'

const config = 'https://newsapi.org/v2/'
const auth = '2a2bd21377bd4cb1a3657052986ebc91'
const HttpClient = axios.create({
  baseURL: config,
})

HttpClient.interceptors.request.use((config) => {
  if (auth) {
    config.headers.Authorization = `Bearer ${auth}`
  }
  return config
})

export default HttpClient