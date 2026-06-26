<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  city: { type: String, default: '' },
  district: { type: String, default: '' },
  cityDistricts: { type: Object, required: true },
})

const emit = defineEmits(['update:city', 'update:district'])

const showCityPicker = ref(false)
const showDistrictPicker = ref(false)

const cities = computed(() => Object.keys(props.cityDistricts))

const districts = computed(() =>
  props.city ? props.cityDistricts[props.city] ?? [] : []
)

const cityLabel = computed(() => props.city || '请选择')
const districtLabel = computed(() => {
  if (!props.city) return '请先选城市'
  return props.district || '请选择'
})

function onCityConfirm({ selectedValues }) {
  emit('update:city', selectedValues[0])
  emit('update:district', '')
  showCityPicker.value = false
}

function onDistrictConfirm({ selectedValues }) {
  emit('update:district', selectedValues[0])
  showDistrictPicker.value = false
}
</script>

<template>
  <div class="form-row">
    <div class="form-group">
      <label class="form-label">选择城市</label>
      <div class="picker-field" @click="showCityPicker = true">
        <van-field
          :model-value="cityLabel"
          readonly
          is-link
          placeholder="请选择"
        />
      </div>
      <van-popup v-model:show="showCityPicker" position="bottom" round>
        <van-picker
          :columns="cities"
          @confirm="onCityConfirm"
          @cancel="showCityPicker = false"
        />
      </van-popup>
    </div>

    <div class="form-group">
      <label class="form-label">选择区域</label>
      <div
        class="picker-field"
        :class="{ 'picker-field--disabled': !city }"
        @click="city && (showDistrictPicker = true)"
      >
        <van-field
          :model-value="districtLabel"
          readonly
          :is-link="!!city"
          placeholder="请先选城市"
        />
      </div>
      <van-popup v-model:show="showDistrictPicker" position="bottom" round>
        <van-picker
          :columns="districts"
          @confirm="onDistrictConfirm"
          @cancel="showDistrictPicker = false"
        />
      </van-popup>
    </div>
  </div>
</template>

<style scoped>
.picker-field--disabled {
  opacity: 0.6;
}
</style>
