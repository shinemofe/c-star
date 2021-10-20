<template>
  <div class="c-sidebar">
    <div class="c-sidebar__tab">
      <div
        v-for="(child, i) in state.children"
        :key="i"
        class="c-sidebar__item"
        :class="{ active: state.active === i }"
        @click="state.active = i"
      >
        <div class="c-sidebar__item-icon"></div>
        <div class="c-sidebar__item-label">{{ child.props.name }}</div>
      </div>
    </div>
    <div class="c-sidebar__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ComponentInternalInstance } from '@vue/runtime-core'

// const ctx = getCurrentInstance()
const state = reactive<{
  children: ComponentInternalInstance[],
  active: number
}>({
  children: [],
  active: 0
})

defineExpose({
  state
})

// console.log(ctx)
</script>

<style lang="less">
@import '../var';
.c-sidebar {
  display: flex;
  width: @sidebar-width;
  height: 100%;
  &__tab {
    width: @sidebar-item-width;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    background: @gray1;
    border-right: 1px @gray1-border-color solid;
    flex-shrink: 0;
  }
  &__item {
    padding-top: 20px;
    &-icon {
      width: 30px;
      height: 30px;
      background: #fff;
    }
    &-label {
      font-size: 14px;
      margin-top: 5px;
    }
    &.active {
      .c-sidebar__item-label {
        color: @main;
      }
    }
  }
  &__content {
    flex-grow: 1;
  }
}
</style>
