<script setup>
defineProps({
  message: { type: Object, required: true },
})
</script>

<template>
  <div :class="['message', `message--${message.role}`]">
    <div v-if="message.role === 'ai'" class="message__avatar">
      <van-icon name="service-o" size="18" />
    </div>
    <div class="message__bubble">
      {{ message.content }}
      <span v-if="message.streaming" class="message__cursor" />
    </div>
  </div>
</template>
