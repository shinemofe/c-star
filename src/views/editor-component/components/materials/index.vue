<template>
  <drag-wrapper target="#container" class="material">
    <div
      v-for="(group, i) in materials"
      :key="i"
      class="material__group"
    >
      <p>{{ group.label }}</p>
      <div class="material__group-item">
        <drag-item
          v-for="(item, i) in group.list"
          :key="i"
          :source="item.id"
          :width="item.width"
          :height="item.height"
        >
          <div class="material__item">
            <div class="material__item-icon" />
            <div class="material__item-label">{{ item.label }}</div>
          </div>
        </drag-item>
      </div>
    </div>
  </drag-wrapper>
</template>

<script setup lang="ts">
import { materials } from './constant'
import DragItem from '@/components/drag-ok/drag-item.vue'
import DragWrapper from '@/components/drag-ok/drag-wrapper.vue'
</script>

<style lang="less">
@import '../../var';
.material {
  user-select: none;
  &__group {
    margin-bottom: 10px;
    &:first-child > p {
      border-top: none;
    }
    & > p {
      font-size: 12px;
      padding: 5px 10px;
      font-weight: bold;
      border-top: 1px solid @gray1-border-color;
      border-bottom: 1px solid @gray1-border-color;
      // background-color: @gray3;
    }
  }
  &__group-item {
    display: flex;
    flex-wrap: wrap;
  }
  &__item {
    width: 110px;
    height: 110px;
    border: 1px @gray1 solid;
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0 5px;
    // background-color: @gray3;
    &-icon {
      width: 70px;
      height: 70px;
      background-color:@gray1;
    }
    &-label {
      font-size: 12px;
    }
  }
}
</style>
