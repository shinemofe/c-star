<script setup lang="ts">
import { useDrag } from './hooks/use-drag'
import { ref, onMounted, computed } from 'vue'
import { DropData } from './types'
import DropItem from './drop-item.vue'
import ReferenceLine from './components/reference-line.vue'
import GridRuler from './components/grid-ruler.vue'

const el = ref()
const emit = defineEmits<{ (event: 'drop', data: DropData): void }>()
const { moveX, moveY, draggingEl, dragging, dragMoving, initDrop, dropResult } = useDrag()
const props = defineProps({
  width: {
    type: [Number, String],
    default: 420
  },
  height: {
    type: [Number, String],
    default: 600
  }
})
const draggingElDataset = computed(() => draggingEl.value ? draggingEl.value.dataset : {})

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
  <div
    class="c-drop-container"
    :style="{
      width: `${props.width}px`,
      height: `${props.height}px`
    }"
  >
    <grid-ruler />
    <div class="c-drop-container__canvas" ref="el">
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
        :style="{
          left: moveX + 'px',
          top: moveY + 'px',
          width: draggingElDataset.width + 'px',
          height: draggingElDataset.height + 'px'
        }"
        v-html="draggingEl.innerHTML"
      />

      <reference-line
        v-if="dragMoving && draggingEl"
      />
    </div>
  </div>
</template>

<style lang="less">
@import './var';
.c-drop-container {
  position: relative;
  //width: 1000px;
  //height: 500px;
  background: @canvas-bg-color;
  user-select: none;
  &__canvas {
    position: absolute;
    left: 20px;
    top: 20px;
    bottom: 20px;
    right: 20px;
    border: 1px @canvas-border-color dashed;
  }
}
.c-dragging {
  position: fixed;
  left: -1000px;
  top: -1000px;
  z-index: 9999;
  background: #ccc;
  & > div {
    width: 100%;
    height: 100%;
  }
}
</style>
