<script setup lang="ts">
import { useResizer } from '../hooks/use-resizer'
const { handleMouseDown: resizerMouseDown } = useResizer()
</script>

<template>
  <div
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
</template>

<style lang="less">
@import '../var';
.c-drop-item {
  &__controls {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    pointer-events: none;
    border: 1px dashed @resizer-focus-color;
  }
  &__controls-resizer {
    position: absolute;
    background: white;
    width: 6px;
    height: 6px;
    border: 1px solid @resizer-border-color;
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
