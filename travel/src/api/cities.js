import { apiGet } from './client'

export function getCities() {
  return apiGet('/api/cities')
}
