<script setup lang="ts">
import { useReferenceLine } from '../hooks/use-reference-line'

const { lineHorizontal, lineVertical } = useReferenceLine()
</script>

<template>
  <div
    v-for="(top, i) in lineHorizontal"
    :key="i"
    class="c-drop-reference-line horizontal"
    :style="{ top: top + 'px' }"
  >
    <span>{{ top }}px</span>
  </div>
  <div
    v-for="(left, i) in lineVertical"
    :key="i"
    class="c-drop-reference-line vertical"
    :style="{ left: left + 'px' }"
  >
    <span>{{ left }}px</span>
  </div>
</template>

<style lang="less">
@import '../var';
.c-drop-reference-line {
  position: absolute;
  background: @reference-line-color;
  z-index: 9999;
  &.horizontal {
    left: 0;
    right: 0;
    height: 1px;
    span {
      top: -7px;
      left: 10px;
    }
  }
  &.vertical {
    top: 0;
    bottom: 0;
    width: 1px;
    span {
      top: 10px;
      left: -10px;
    }
  }
  span {
    position: absolute;
    font-size: 10px;
    color: @reference-line-color;
    background: @canvas-bg-color;
  }
}
</style>
