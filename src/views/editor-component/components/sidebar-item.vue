<template>
  <div v-if="showContent" class="c-sidebar__content-item">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
import { ComponentInternalInstance } from '@vue/runtime-core'

const props = defineProps({
  name: String
})
const ctx = getCurrentInstance()
const parentState = ctx?.parent?.exposed?.state
const index = ref(-1)
const showContent = computed(() => index.value === parentState.active)
if (parentState.children.every((x: ComponentInternalInstance) => x !== ctx)) {
  index.value = parentState.children.length
  parentState.children.push(ctx)
  // console.log(ctx)
}
</script>

<style lang="less">
@import '../var';
.c-sidebar {
  &__content-item {
  }
}
</style>
