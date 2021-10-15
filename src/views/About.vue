<template>
  <p @click="add">I'm just a dumb about page with no content. {{ count }}</p>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)

function add () {
  count.value++
}

console.log(count)
</script>
