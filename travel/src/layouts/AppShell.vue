<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BgDecor from '../components/BgDecor.vue'

const TAB_PATHS = ['/', '/chat', '/profile']

const route = useRoute()
const router = useRouter()
const active = ref(0)

const isChat = computed(() => route.path.startsWith('/chat'))

function getTabIndex(path) {
  if (path === '/') return 0
  if (path.startsWith('/chat')) return 1
  if (path.startsWith('/profile')) return 2
  return 0
}

watch(
  () => route.path,
  (path) => {
    active.value = getTabIndex(path)
  },
  { immediate: true }
)

function onTabChange(index) {
  const target = TAB_PATHS[index]
  if (route.path !== target) {
    router.push(target)
    return
  }
  if (Object.keys(route.query).length > 0) {
    router.replace(target)
  }
}
</script>

<template>
  <div class="app-shell" :class="{ 'app-shell--chat': isChat }">
    <BgDecor />
    <div class="app-shell__content">
      <router-view />
      <van-tabbar
        v-model="active"
        class="app-tabbar"
        active-color="#2D6A6A"
        safe-area-inset-bottom
        @change="onTabChange"
      >
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="chat-o">对话</van-tabbar-item>
        <van-tabbar-item icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
