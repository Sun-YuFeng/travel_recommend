<script setup>
import { onMounted, ref } from 'vue'
import { showToast } from 'vant'
import { getChatSessions } from '../api/chat'
import { getFavorites } from '../api/favorites'
import { getUserProfile, formatUserStats } from '../api/user'
import { ABOUT_CONTENT, MOCK_USER } from '../mock/data'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const aboutOpen = ref(false)
const panel = ref(null)
const nickname = ref(MOCK_USER.nickname)
const statsText = ref(MOCK_USER.stats)
const favorites = ref([])
const sessions = ref([])
const loading = ref(false)

onMounted(() => {
  if (USE_MOCK) return
  getUserProfile()
    .then((profile) => {
      nickname.value = profile.nickname
      statsText.value = formatUserStats(profile.stats)
    })
    .catch(() => {})
})

async function openPanel(type) {
  if (USE_MOCK) {
    showToast('功能开发中，敬请期待')
    return
  }
  loading.value = true
  panel.value = type
  try {
    if (type === 'favorites') {
      favorites.value = await getFavorites()
    } else if (type === 'history') {
      sessions.value = await getChatSessions()
    }
  } catch {
    showToast('加载失败，请稍后重试')
    panel.value = null
  } finally {
    loading.value = false
  }
}

const menuItems = [
  { icon: 'star-o', label: '我的收藏', action: () => openPanel('favorites') },
  { icon: 'clock-o', label: '历史记录', action: () => openPanel('history') },
  { icon: 'setting-o', label: '设置', action: () => showToast('功能开发中，敬请期待') },
]

function closePanel() {
  panel.value = null
}
</script>

<template>
  <header class="profile-header">
    <div class="profile-header__avatar-wrap">
      <div class="profile-header__avatar">
        <van-icon name="user-o" size="40" />
      </div>
    </div>
    <h1 class="profile-header__name">{{ nickname }}</h1>
    <p class="profile-header__desc">{{ statsText }}</p>
  </header>

  <nav class="menu-list">
    <van-cell
      v-for="item in menuItems"
      :key="item.label"
      :title="item.label"
      is-link
      @click="item.action"
    >
      <template #icon>
        <van-icon :name="item.icon" size="20" class="menu-icon" />
      </template>
    </van-cell>
    <van-cell title="关于我们" is-link @click="aboutOpen = true">
      <template #icon>
        <van-icon name="info-o" size="20" class="menu-icon" />
      </template>
    </van-cell>
  </nav>

  <van-dialog
    v-model:show="aboutOpen"
    title="关于我们"
    confirm-button-text="知道了"
    confirm-button-color="#2D6A6A"
  >
    <p class="about-content">{{ ABOUT_CONTENT }}</p>
    <p class="about-version">版本 v0.1.0</p>
  </van-dialog>

  <van-dialog
    :show="!!panel"
    :title="panel === 'favorites' ? '我的收藏' : '历史记录'"
    show-cancel-button
    confirm-button-text="关闭"
    confirm-button-color="#2D6A6A"
    @update:show="(v) => !v && closePanel()"
    @confirm="closePanel"
    @cancel="closePanel"
  >
    <div class="panel-body">
      <p v-if="loading" class="panel-meta">加载中...</p>
      <template v-else-if="panel === 'favorites'">
        <p v-if="favorites.length === 0" class="panel-meta">暂无收藏</p>
        <ul v-else class="panel-list">
          <li v-for="f in favorites" :key="f.id">
            <strong>{{ f.poi.name }}</strong>
            <br />
            <span class="panel-meta">
              {{ f.poi.cityName }} · {{ f.poi.districtName }} · ⭐{{ f.poi.rating }}
            </span>
          </li>
        </ul>
      </template>
      <template v-else-if="panel === 'history'">
        <p v-if="sessions.length === 0" class="panel-meta">暂无历史记录</p>
        <ul v-else class="panel-list">
          <li v-for="s in sessions" :key="s.id">
            <strong>
              {{ s.city ?? '自由对话' }}{{ s.district ? ` · ${s.district}` : '' }}
            </strong>
            <br />
            <span class="panel-meta">
              {{ s.theme ?? '通用' }} ·
              {{ new Date(s.createdAt).toLocaleString('zh-CN') }}
            </span>
          </li>
        </ul>
      </template>
    </div>
  </van-dialog>

  <div class="spacer-bottom" />
</template>

<style scoped>
.menu-icon {
  margin-right: 12px;
  color: var(--color-text-secondary);
}

.about-content {
  padding: 0 20px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.about-version {
  padding: 8px 20px 0;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.panel-body {
  padding: 12px 20px 4px;
  max-height: 50vh;
  overflow-y: auto;
}
</style>
