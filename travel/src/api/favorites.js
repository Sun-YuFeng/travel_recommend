import { apiGet } from './client'

export function getFavorites() {
  return apiGet('/api/favorites')
}
