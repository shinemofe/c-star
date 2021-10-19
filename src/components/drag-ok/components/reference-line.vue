<script setup lang="ts">
import { useReferenceLine } from '../hooks/use-reference-line'

const { lineHorizontal, lineVertical, distanceHorizontal, distanceVertical } = useReferenceLine()
</script>

<template>
  <div
    v-for="(top, i) in lineHorizontal"
    :key="i"
    class="c-drop-reference-line horizontal"
    :style="{ top: top + 'px' }"
  >
    <span class="px">{{ top }}px</span>
    <span v-if="distanceHorizontal[i]" class="distance">{{ distanceHorizontal[i] }}px</span>
  </div>
  <div
    v-for="(left, i) in lineVertical"
    :key="i"
    class="c-drop-reference-line vertical"
    :style="{ left: left + 'px' }"
  >
    <span class="px">{{ left }}px</span>
    <span v-if="distanceVertical[i]" class="distance">{{ distanceVertical[i] }}px</span>
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
    .distance {
      top: -7px;
      right: -22px;
      transform: rotate(-90deg);
      line-height: 1;
    }
    .px {
      top: -7px;
      left: 5px;
    }
  }
  &.vertical {
    top: 0;
    bottom: 0;
    width: 1px;
    .distance {
      bottom: -15px;
      left: -10px;
    }
    .px {
      top: 5px;
      left: -10px;
    }
  }
  span {
    position: absolute;
    font-size: 10px;
    color: @reference-line-color;
    width: 30px;
    text-align: center;
    &.px {
      background: @canvas-bg-color;
    }
  }
}
</style>
