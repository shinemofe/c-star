<script setup lang="ts">
import { useDrag } from './hooks/use-drag'
import { ref, onMounted } from 'vue'

const { initDrag } = useDrag()
const wrapper = ref()
const props = defineProps({
  target: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  initDrag({
    wrapperEl: wrapper.value,
    targetSelector: props.target
  })
})
</script>

<template>
  <div class="c-drag-wrapper" ref="wrapper">
    <slot />
  </div>
</template>
