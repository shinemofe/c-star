<template>
  <c-layout>
    <template #header>
      <c-header />
    </template>
    <template #sidebar>
      <c-sidebar>
        <c-sidebar-item name="视图">
          <drag-wrapper target="#container">
            <drag-item
              v-for="item in origin"
              :key="item.id"
              :source="item.id"
              :width="item.width"
              :height="item.height"
            >
              <div class="item">
                {{ item.id }}
              </div>
            </drag-item>
          </drag-wrapper>
        </c-sidebar-item>
        <c-sidebar-item name="资产">2</c-sidebar-item>
        <c-sidebar-item name="设置">3</c-sidebar-item>
      </c-sidebar>
    </template>
    <drop-container
      id="container"
      @drop="handleDrop"
    >
      <template v-slot:drop-item="{ data }">
        <span>{{ data.id }}</span>
      </template>
    </drop-container>
  </c-layout>
</template>

<script setup lang="ts">
import CHeader from './components/header.vue'
import CSidebar from './components/sidebar.vue'
import CSidebarItem from './components/sidebar-item.vue'
import CLayout from './components/layout.vue'
import DropContainer from '../../components/drag-ok/drop-container.vue'
import DragItem from '../../components/drag-ok/drag-item.vue'
import DragWrapper from '../../components/drag-ok/drag-wrapper.vue'
import { ref } from 'vue'
import { DropData } from '../../components/drag-ok/types'

const origin = ref([
  { id: 1, width: 200, height: 50 },
  { id: 2, width: 100, height: 100 },
  { id: 3, width: 200, height: 200 }
])
// const result = ref<Array<DropData>>([])
function handleDrop (data: DropData) {
  console.log(data)
  // const item = origin.value.find(x => x.id === data.id)
  // result.value.push({
  //   ...data,
  //   ...item
  // })
}
</script>

<style>
.item {
  width: 100px;
  height: 60px;
  background: cadetblue;
}
</style>
