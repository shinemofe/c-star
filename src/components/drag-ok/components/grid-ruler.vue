<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'

const el = ref()
const state = reactive({
  width: 0,
  height: 0
})
onMounted(() => {
  const { width, height } = el.value.getBoundingClientRect()
  state.width = width
  state.height = height
})

const cellWidth = 100
const cellUnitWidth = 10
const cellUnit = new Array(cellUnitWidth).fill()
const ruler = computed(() => ({
  x: new Array(Math.floor(state.width / cellWidth)).fill(),
  y: new Array(Math.floor(state.height / cellWidth)).fill()
}))
</script>

<template>
  <div class="grid-ruler" ref="el">
    <div
      v-for="k in Object.keys(ruler)"
      :key="k"
      :class="`grid-ruler__${k}`"
    >
      <span
        v-for="(_, i) in ruler[k]"
        :key="i"
        :class="`grid-ruler__${k}-item`"
        :style="{
          [k === 'x' ? 'width' : 'height']: `${cellWidth}px`,
          [k === 'x' ? 'height' : 'width']: `${20}px`
        }"
      >
        <span v-if="i === 0" :class="`grid-ruler__${k}-cell-label start`">0</span>
        <span :class="`grid-ruler__${k}-cell-label`">{{ (i + 1) * cellWidth }}</span>
        <span
          v-for="(__, j) in cellUnit"
          :key="j"
          :class="`grid-ruler__${k}-cell-unit`"
          :style="{
            width: `${cellUnitWidth}px`,
            height: `${cellUnitWidth}px`
          }"
        />
      </span>
    </div>
  </div>
</template>

<style lang="less">
@import '../var';
.grid-ruler {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  &__x {
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    display: flex;
    overflow: hidden;
    border-left: 1px solid @grid-ruler-line-color;
  }
  &__x-item {
    position: relative;
    display: flex;
    border-right: 1px solid @grid-ruler-line-color;
  }

  &__y {
    position: absolute;
    top: 20px;
    left: 0;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-top: 1px solid @grid-ruler-line-color;
  }
  &__y-item {
    position: relative;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid @grid-ruler-line-color;
  }

  &__x-cell-unit,
  &__y-cell-unit {
    display: block;
    &:not(:last-of-type) {
      border: inherit;
    }
  }

  &__x-cell-label,
  &__y-cell-label {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 10px;
    color: @grid-ruler-label-color;
    line-height: 1;
  }
  &__y-cell-label {
    transform: rotate(-90deg);
    transform-origin: top;
  }

  &__x-cell-label.start {
    left: 0;
    right: initial;
  }
  &__y-cell-label.start {
    top: 5px;
    bottom: initial;
    right: 7px;
  }
}
</style>
