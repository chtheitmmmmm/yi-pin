<script setup lang='ts'>
import type { BodyArea } from '@/components/body/Body.vue';

const props = defineProps<{
  a: BodyArea
}>()


</script>

<template>
<div class='container'>
  <div class='navbar'>
    <h1 class='h1 text-secondary'  :id='a.link'>
      {{ a.tt }}
    </h1>
  </div>
  <div class='container show card bg-opacity-10 bg-secondary'>
    <div class='card-body'>
      <slot></slot>
    </div>
  </div>
  <hr />
</div>
</template>

<style scoped lang='scss'>

</style>