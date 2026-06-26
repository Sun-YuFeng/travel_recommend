<script setup>
import { QUICK_PROMPTS } from '../mock/data'

defineProps({
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['select'])
</script>

<template>
  <div class="quick-tags">
    <van-tag
      v-for="prompt in QUICK_PROMPTS"
      :key="prompt"
      class="quick-tag"
      round
      type="primary"
      plain
      :disabled="disabled"
      @click="!disabled && emit('select', prompt)"
    >
      {{ prompt }}
    </van-tag>
  </div>
</template>

<style scoped>
.quick-tag {
  padding: 8px 16px;
  background: var(--color-brand-blue-soft) !important;
  color: var(--color-brand-blue) !important;
  border-color: transparent !important;
  font-size: 13px;
  font-weight: 500;
}
</style>
