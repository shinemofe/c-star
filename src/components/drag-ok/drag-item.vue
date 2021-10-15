<script setup lang="ts">
import { useDrag } from './hooks/use-drag'
import { ref } from 'vue'

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
const el = ref()
const { handleMouseDown } = useDrag()
</script>

<template>
  <div
    ref="el"
    class="c-drag-item"
    :data-source="props.source"
    :data-width="props.width"
    :data-height="props.height"
    @mousedown="e => handleMouseDown(e, el)"
  >
    <slot />
  </div>
</template>
