<script setup lang="ts">
import { useDrag } from './hooks/use-drag'
import { ref } from 'vue'
import { DropData } from './types'

const props = defineProps<{ data: DropData }>()
const el = ref()
const { handleMouseDown, setCurrent, current } = useDrag()

function handleClick () {
  setCurrent(props.data)
}
</script>

<template>
  <div
    ref="el"
    class="c-drop-item"
    :class="{
      'c-drop-item__active': current && current.id === props.data.id
    }"
    :style="{
      width: props.data.width + 'px',
      height: props.data.height + 'px',
      left: props.data.x + 'px',
      top: props.data.y + 'px',
      zIndex: props.data.zIndex
    }"
    :data-id="props.data.id"
    @click="handleClick"
    @mousedown="e => handleMouseDown(e, el)"
  >
    <slot />
  </div>
</template>

<style lang="less">
.c-drop-item {
  position: absolute;
  background-color: antiquewhite;
  &__active {
    border: 1px cadetblue solid;
  }
}
</style>
