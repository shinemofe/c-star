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
  />
  <div
    v-for="(left, i) in lineVertical"
    :key="i"
    class="c-drop-reference-line vertical"
    :style="{ left: left + 'px' }"
  />
</template>

<style lang="less">
.c-drop-reference-line {
  position: absolute;
  background: #3b8ff6;
  z-index: 9999;
  &.horizontal {
    left: 0;
    right: 0;
    height: 1px;
  }
  &.vertical {
    top: 0;
    bottom: 0;
    width: 1px;
  }
}
</style>
