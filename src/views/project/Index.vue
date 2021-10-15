<template>
  <h2 class="mt-3.5 mb-2.5 text-xl flex text-blue-400 justify-center">项目管理器</h2>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
        v-for="tab in tabList"
        :label="tab.label"
        :name="tab.name">
      <component :is="tab.component"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import {ref, markRaw, defineAsyncComponent} from 'vue'
import {useStore, Mutation} from '@/store/index'
const store = useStore()
const activeName = ref('ProjectList')
const tabList = ref([
  {label: '项目', name: 'ProjectList', component: markRaw(defineAsyncComponent(() => import('./components/List.vue')))},
  //  todo 创建
  // {label: '创建', name: 'CreateProject', component: markRaw(defineAsyncComponent(() => import('./components/Import.vue')))},
  {label: '导入', name: 'ImportProject', component: markRaw(defineAsyncComponent(() => import('./components/Create.vue')))},
])
function handleClick() {
  store.commit(Mutation.INCREMENT, 1)
}
</script>


<style>
.el-tabs__nav-scroll {
 display: flex;
  justify-content: center;
}
</style>
