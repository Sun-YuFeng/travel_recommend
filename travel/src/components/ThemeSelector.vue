<script setup>
const THEMES = [
  { type: 'food', icon: 'shop-o', label: '美食' },
  { type: 'scenic', icon: 'photo-o', label: '景点' },
  { type: 'entertainment', icon: 'smile-o', label: '娱乐设施' },
]

defineProps({
  selected: { type: String, default: null },
})

const emit = defineEmits(['select'])
</script>

<template>
  <div class="form-group">
    <label class="form-label">打卡主题</label>
    <div class="theme-grid">
      <button
        v-for="theme in THEMES"
        :key="theme.type"
        type="button"
        :class="[
          'theme-card',
          `theme-card--${theme.type}`,
          { selected: selected === theme.type },
        ]"
        @click="emit('select', theme.type)"
      >
        <span class="theme-card__check">
          <van-icon name="success" size="12" color="#fff" />
        </span>
        <span class="theme-card__icon">
          <van-icon :name="theme.icon" size="26" />
        </span>
        <span class="theme-card__label">{{ theme.label }}</span>
      </button>
    </div>
  </div>
</template>
