import { apiGet } from './client'

export function getChatSessions() {
  return apiGet('/api/chat/sessions')
}

export function getChatSession(id) {
  return apiGet(`/api/chat/sessions/${id}`)
}
