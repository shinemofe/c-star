<script setup lang="ts">
import { useDrag } from './hooks/use-drag'
import { ref, onMounted } from 'vue'
import { DropData } from './types'
import DropItem from './drop-item.vue'
import ReferenceLine from './components/reference-line.vue'

const el = ref()
const emit = defineEmits<{ (event: 'drop', data: DropData): void }>()
const { moveX, moveY, draggingEl, dragging, initDrop, dropResult } = useDrag()

onMounted(() => {
  initDrop({
    dropContainerEl: el.value,
    ondrop: (data: DropData) => {
      emit('drop', data)
    }
  })
})
</script>

<template>
  <div class="c-drop-container" ref="el">
    <drop-item
      v-for="item in dropResult"
      :key="item.id"
      :data="item"
    >
      <slot name="drop-item" :data="item" />
    </drop-item>

    <div
      v-if="dragging && draggingEl && !draggingEl.dataset.id"
      class="c-dragging"
      :style="{ left: moveX + 'px', top: moveY + 'px' }"
      v-html="draggingEl.innerHTML"
    />

    <reference-line
      v-if="dragging && draggingEl"
    />
  </div>
</template>

<style lang="less">
.c-drop-container {
  position: relative;
  width: 1000px;
  height: 500px;
  background: #ddd;
  user-select: none;
}
.c-dragging {
  position: fixed;
  left: -1000px;
  top: -1000px;
  z-index: 9999;
}
</style>
