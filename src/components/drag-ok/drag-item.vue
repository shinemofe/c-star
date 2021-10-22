<script setup lang="ts">
import { useDrag } from './hooks/use-drag'
import { getCurrentInstance } from 'vue'

const props = defineProps({
  source: {
    type: [String, Number],
    required: true
  },
  width: {
    type: Number,
    default: 100
  },
  height: {
    type: Number,
    default: 100
  }
})
const { handleMouseDown } = useDrag()
const instance = getCurrentInstance()
</script>

<template>
  <div
    class="c-drag-item"
    :data-source="props.source"
    :data-width="props.width"
    :data-height="props.height"
    @mousedown="e => handleMouseDown(e, instance)"
  >
    <slot />
  </div>
</template>
