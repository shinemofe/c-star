<script setup lang="ts">
import { useDrag } from './hooks/use-drag'
import { computed, getCurrentInstance } from 'vue'
import { DropData } from './types'
import Resizer from './components/resizer.vue'

const props = defineProps<{ data: DropData }>()
const { handleMouseDown, setCurrent, current } = useDrag()
const isCurrent = computed(() => current && current.value && current.value.id === props.data.id)
const instance = getCurrentInstance()

function handleClick () {
  setCurrent(props.data)
}
</script>

<template>
  <div
    class="c-drop-item"
    :class="{
      'c-drop-item__active': isCurrent
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
  >
    <div
      class="c-drop-item__content"
      @mousedown="e => handleMouseDown(e, instance)"
    >
      <slot />
    </div>
    <resizer v-if="isCurrent" />
  </div>
</template>

<style lang="less">
.c-drop-item {
  position: absolute;
  background-color: antiquewhite;
  &__active {
    // border: 1px cadetblue solid;
  }
  &__content {
    width: 100%;
    height: 100%;
  }
}
</style>
