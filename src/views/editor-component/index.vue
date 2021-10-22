<template>
  <c-layout>
    <template #header>
      <c-header />
    </template>
    <template #sidebar>
      <c-sidebar>
        <c-sidebar-item name="视图">
          <material />
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
        <span>{{  }}</span>
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
// import { ref } from 'vue'
import { DropData } from '../../components/drag-ok/types'
import Material from './components/materials/index.vue'

// const origin = ref([
//   { id: 1, width: 200, height: 50 },
//   { id: 2, width: 100, height: 100 },
//   { id: 3, width: 200, height: 200 }
// ])
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
/*.item {*/
/*  width: 100px;*/
/*  height: 60px;*/
/*  background: cadetblue;*/
/*}*/
</style>
