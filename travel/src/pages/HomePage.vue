<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CityPicker from '../components/CityPicker.vue'
import ThemeSelector from '../components/ThemeSelector.vue'
import { getCities } from '../api/cities'
import { CITY_DISTRICTS } from '../mock/data'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const router = useRouter()
const city = ref('')
const district = ref('')
const theme = ref(null)
const cityDistricts = ref({ ...CITY_DISTRICTS })

const isValid = computed(() => Boolean(city.value && district.value && theme.value))

onMounted(() => {
  if (USE_MOCK) return
  getCities()
    .then((data) => {
      cityDistricts.value = data
    })
    .catch(() => {
      cityDistricts.value = { ...CITY_DISTRICTS }
    })
})

function handleCityChange(value) {
  city.value = value
  district.value = ''
}

function handlePlan() {
  if (!isValid.value || !theme.value) return
  const params = new URLSearchParams({
    city: city.value,
    district: district.value,
    theme: theme.value,
  })
  router.push(`/chat?${params.toString()}`)
}
</script>

<template>
  <header class="banner">
    <div class="banner__content">
      <h1 class="banner__title">城市打卡助手</h1>
      <p class="banner__subtitle">发现城市精彩，规划你的专属打卡路线</p>
    </div>
  </header>

  <section class="card card--overlap">
    <h2 class="section-title">打卡规划</h2>
    <CityPicker
      :city="city"
      :district="district"
      :city-districts="cityDistricts"
      @update:city="handleCityChange"
      @update:district="district = $event"
    />
    <ThemeSelector :selected="theme" @select="theme = $event" />
    <van-button
      type="primary"
      block
      round
      class="plan-btn"
      :disabled="!isValid"
      @click="handlePlan"
    >
      开始规划
    </van-button>
  </section>

  <section class="quick-section">
    <h2 class="section-title">快捷入口</h2>
    <div class="quick-grid">
      <router-link to="/chat" class="quick-entry quick-entry--ai">
        <span class="quick-entry__icon">
          <van-icon name="chat-o" size="30" />
        </span>
        <span class="quick-entry__title">AI 智能推荐</span>
        <span class="quick-entry__desc">对话式探索打卡点</span>
      </router-link>
      <router-link to="/profile" class="quick-entry quick-entry--profile">
        <span class="quick-entry__icon">
          <van-icon name="user-o" size="30" />
        </span>
        <span class="quick-entry__title">个人中心</span>
        <span class="quick-entry__desc">收藏与历史记录</span>
      </router-link>
    </div>
  </section>

  <div class="spacer-bottom" />
</template>
