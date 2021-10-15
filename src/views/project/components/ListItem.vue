<template>
  <div class="flex justify-between m-auto w-">
    <div>
      <div>{{project.name}}</div>
      <div>{{project.path}}</div>
    </div>
    <div class="flex">
      <el-button>在编辑器中打开</el-button>
      <el-button>仓库</el-button>
      <el-button><span class="el-icon-edit"/></el-button>
      <el-button><span class="el-icon-delete"/></el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useStore, Mutation} from '@/store/index'

const store = useStore()
const count = computed(() => store.state.count)
const props = defineProps<{
  project: object
  optionalProp?: number
}>()

function increment() {
  store.commit(Mutation.INCREMENT, 1)
}
</script>


<style scoped>

</style>
