import { getReplyByPrompt, getReplyByTheme, mockStreamText } from '../mock/mockStream'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

async function fetchStreamMock(options) {
  let reply = getReplyByPrompt(options.prompt)
  if (options.theme && /打卡点|规划|主题/.test(options.prompt)) {
    reply = getReplyByTheme(options.theme)
  }
  await mockStreamText(reply, options.onChunk)
  options.onDone?.()
}

async function fetchStreamSSE(options) {
  const { prompt, city, district, theme, sessionId, history, onChunk, onDone } = options

  const res = await fetch(`${API_BASE}/api/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, city, district, theme, sessionId, history }),
  })

  if (!res.ok) {
    throw new Error(`Stream request failed: ${res.status}`)
  }

  const reader = res.body?.getReader()
  if (!reader) {
    throw new Error('No response body')
  }

  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const data = line.slice(6).trim()
      if (data === '[DONE]') {
        onDone?.()
        return
      }
      try {
        const parsed = JSON.parse(data)
        if (parsed.error) {
          throw new Error(parsed.error)
        }
        if (parsed.content) {
          onChunk(parsed.content)
        }
      } catch (err) {
        if (err instanceof SyntaxError) continue
        throw err
      }
    }
  }

  onDone?.()
}

export async function fetchStream(options) {
  try {
    if (USE_MOCK) {
      await fetchStreamMock(options)
    } else {
      await fetchStreamSSE(options)
    }
  } catch (err) {
    options.onError?.(err instanceof Error ? err : new Error(String(err)))
  }
}
