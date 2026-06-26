<script setup>
const ROUNDED_TRIANGLE_PATH =
  'M50 10 C52 10 54 12 56 16 L84 80 C88 88 80 92 74 88 L26 88 C20 92 12 88 16 80 L44 16 C46 12 48 10 50 10 Z'

const FULL_SHAPES = [
  { id: '1', type: 'circle', color: 'blue', size: 240, top: '-6%', right: '-20%', anim: 'float-a' },
  { id: '2', type: 'circle', color: 'green', size: 190, top: '4%', right: '2%', anim: 'float-b' },
  { id: '3', type: 'square', color: 'blue', size: 110, top: '10%', left: '-10%', anim: 'drift' },
  { id: '4', type: 'triangle', color: 'green', size: 88, top: '7%', left: '6%', anim: 'sway' },
  { id: '5', type: 'triangle', color: 'blue', size: 72, top: '18%', right: '14%', anim: 'float-b' },
  { id: '6', type: 'square', color: 'green', size: 96, top: '26%', right: '-8%', anim: 'float-a' },
  { id: '7', type: 'circle', color: 'green', size: 220, top: '32%', left: '-22%', anim: 'drift' },
  { id: '8', type: 'triangle', color: 'blue', size: 80, top: '44%', right: '6%', anim: 'sway' },
  { id: '9', type: 'square', color: 'blue', size: 104, top: '52%', left: '-6%', anim: 'float-b' },
  { id: '10', type: 'circle', color: 'blue', size: 180, top: '58%', right: '-14%', anim: 'float-a' },
  { id: '11', type: 'triangle', color: 'green', size: 68, top: '66%', left: '12%', anim: 'sway' },
  { id: '12', type: 'circle', color: 'green', size: 160, top: '74%', left: '-18%', anim: 'drift' },
  { id: '13', type: 'square', color: 'green', size: 88, top: '82%', right: '4%', anim: 'float-a' },
  { id: '14', type: 'triangle', color: 'blue', size: 76, top: '88%', right: '18%', anim: 'float-b' },
  { id: '15', type: 'square', color: 'blue', size: 72, top: '92%', left: '8%', anim: 'drift' },
]
</script>

<template>
  <div class="bg-decor bg-decor--fixed" aria-hidden="true">
    <span
      v-for="shape in FULL_SHAPES"
      :key="shape.id"
      :class="[
        'bg-decor__item',
        `bg-decor__item--${shape.type}`,
        `bg-decor__anim-${shape.anim}`,
      ]"
      :style="{
        width: `${shape.size}px`,
        height: `${shape.size}px`,
        top: shape.top,
        left: shape.left,
        right: shape.right,
        bottom: shape.bottom,
      }"
    >
      <svg
        v-if="shape.type === 'triangle'"
        class="bg-decor__triangle-svg"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path
          :d="ROUNDED_TRIANGLE_PATH"
          :class="`bg-decor__item-inner bg-decor__item-inner--${shape.color}`"
        />
      </svg>
      <span
        v-else
        :class="`bg-decor__item-inner bg-decor__item-inner--${shape.color}`"
      />
    </span>
  </div>
</template>
