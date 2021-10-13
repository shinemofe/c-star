<template>
  <ListItem v-for="project in list" :project="project"></ListItem>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import ListItem from './ListItem.vue'
const list = ref([{
  path: '本地资源路径',
  name: 'xxx',
  id: 'xxx',
  info: {}
}])
</script>


<style scoped>

</style>
