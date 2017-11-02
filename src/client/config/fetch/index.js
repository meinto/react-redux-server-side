import nodeFetch from 'node-fetch'
import { isProduction } from '../env'

const host = isProduction()
  ? 'http://localhost:8080'
  : 'http://localhost:8080'

export const ENDPOINTS = {
  // endpoint: '/my-endpoint'
}

export const fetch = endpoint => {
  return nodeFetch(host + endpoint)
    .then(res => res.json())
}
