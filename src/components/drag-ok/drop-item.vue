<script setup lang="ts">
import { useDrag } from './hooks/use-drag'
import { ref, computed } from 'vue'
import { DropData } from './types'
import { useResizer } from './hooks/use-resizer'

const props = defineProps<{ data: DropData }>()
const el = ref()
const { handleMouseDown, setCurrent, current } = useDrag()
const { handleMouseDown: resizerMouseDown } = useResizer()
const isCurrent = computed(() => current.value && current.value.id === props.data.id)

function handleClick () {
  setCurrent(props.data)
}
</script>

<template>
  <div
    ref="el"
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
      @mousedown="e => handleMouseDown(e, el)"
    >
      <slot />
    </div>
    <div
      v-if="isCurrent"
      class="c-drop-item__controls"
    >
      <div
        ref=""
        class="c-drop-item__controls-resizer n w"
        style="left: -3px;top: -3px;"
        @mousedown="e => resizerMouseDown(e, 'lt')"
      />
      <div
        class="c-drop-item__controls-resizer n e"
        style="right: -3px;top: -3px;"
        @mousedown="e => resizerMouseDown(e, 'rt')"
      />
      <div
        class="c-drop-item__controls-resizer s e"
        style="right: -3px;bottom: -3px;"
        @mousedown="e => resizerMouseDown(e, 'rb')"
      />
      <div
        class="c-drop-item__controls-resizer s w"
        style="left: -3px;bottom: -3px;"
        @mousedown="e => resizerMouseDown(e, 'lb')"
      />
<!--      <div class="c-drop-item__controls-resizer w" />-->
<!--      <div class="c-drop-item__controls-resizer n" />-->
<!--      <div class="c-drop-item__controls-resizer s" />-->
<!--      <div class="c-drop-item__controls-resizer e" />-->
    </div>
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
  &__controls {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    pointer-events: none;
    border: 1px dashed #ccc;
  }
  &__controls-resizer {
    position: absolute;
    background: white;
    width: 6px;
    height: 6px;
    border: 1px solid #3b8ff6;
    pointer-events: all;
    &.n.w {
      cursor: nw-resize;
    }
    &.n.e {
      cursor: ne-resize;
    }
    &.s.e {
      cursor: se-resize;
    }
    &.s.w {
      cursor: sw-resize;
    }
    &.n,
    &.s {
      cursor: n-resize;
    }
    &.e,
    &.w {
      cursor: e-resize;
    }
  }
}
</style>
