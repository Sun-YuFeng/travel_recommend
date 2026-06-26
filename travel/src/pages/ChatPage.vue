<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ChatBubble from '../components/ChatBubble.vue'
import QuickTags from '../components/QuickTags.vue'
import { THEME_LABELS } from '../mock/data'
import { fetchStream } from '../utils/fetchStream'

const WELCOME = {
  id: 'welcome',
  role: 'ai',
  content:
    '你好！我是城市打卡助手，告诉我你想去哪里玩，或者点击下方快捷标签，我来为你推荐精彩打卡点 ✨',
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const route = useRoute()
const messages = ref([WELCOME])
const input = ref('')
const isStreaming = ref(false)
const listRef = ref(null)
const planInitRef = ref(false)

const city = ref(route.query.city)
const district = ref(route.query.district)
const theme = ref(route.query.theme)

watch(
  () => route.query,
  (query) => {
    city.value = query.city
    district.value = query.district
    theme.value = query.theme
  }
)

function scrollToBottom() {
  nextTick(() => {
    const el = listRef.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

async function streamReply(prompt, context) {
  if (isStreaming.value) return
  isStreaming.value = true

  const history = messages.value
    .filter((m) => m.id !== 'welcome')
    .map((m) => ({ role: m.role, content: m.content }))

  const userMsg = {
    id: createId(),
    role: 'user',
    content: prompt,
  }
  const aiId = createId()

  messages.value = [
    ...messages.value,
    userMsg,
    { id: aiId, role: 'ai', content: '', streaming: true },
  ]

  const updateAi = (chunk) => {
    messages.value = messages.value.map((m) =>
      m.id === aiId ? { ...m, content: m.content + chunk } : m
    )
    scrollToBottom()
  }

  await fetchStream({
    prompt,
    city: context?.city ?? city.value,
    district: context?.district ?? district.value,
    theme: context?.theme ?? theme.value,
    history,
    onChunk: updateAi,
  })

  messages.value = messages.value.map((m) =>
    m.id === aiId ? { ...m, streaming: false } : m
  )
  isStreaming.value = false
  scrollToBottom()
}

onMounted(() => {
  if (!city.value || !district.value || !theme.value || planInitRef.value) return
  planInitRef.value = true

  const themeName = THEME_LABELS[theme.value] ?? theme.value
  const prompt = `我想在${city.value}${district.value}找${themeName}相关的打卡点，帮我规划一下`

  setTimeout(() => {
    streamReply(prompt, {
      city: city.value,
      district: district.value,
      theme: theme.value,
    })
  }, 500)
})

watch(messages, scrollToBottom, { deep: true })

function handleSend() {
  const text = input.value.trim()
  if (!text || isStreaming.value) return
  input.value = ''
  streamReply(text)
}
</script>

<template>
  <div class="chat-page">
    <van-nav-bar title="AI 打卡助手" class="chat-nav" />

    <div ref="listRef" class="message-list">
      <ChatBubble
        v-for="msg in messages"
        :key="msg.id"
        :message="msg"
      />
    </div>

    <footer class="chat-footer">
      <QuickTags
        :disabled="isStreaming"
        @select="streamReply"
      />
      <div class="chat-input-row">
        <van-field
          v-model="input"
          placeholder="输入你的问题..."
          :disabled="isStreaming"
          @keyup.enter="handleSend"
        />
        <van-button
          class="chat-send-btn"
          type="primary"
          round
          icon="guide-o"
          :disabled="!input.trim() || isStreaming"
          @click="handleSend"
        />
      </div>
    </footer>
  </div>
</template>
