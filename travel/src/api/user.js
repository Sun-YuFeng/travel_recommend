import { apiGet } from './client'

export function getUserProfile() {
  return apiGet('/api/user/profile')
}

export function formatUserStats(stats) {
  return `已探索 ${stats.citiesExplored} 个城市 · ${stats.checkinsCount} 个打卡点`
}
