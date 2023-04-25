<script setup lang='ts'>
import type { BodyArea } from '@/components/main.page/body/Body.vue';

const props = defineProps<{
  a: BodyArea
}>()


</script>

<template>
<div class='container'>
  <div class='navbar'>
    <div class='h1 text-secondary'  :id='a.link'>
      {{ a.tt }}
    </div>
  </div>
  <div class='container collapse show card bg-opacity-10 bg-secondary'>
    <div class='card-body'>
      <slot></slot>
    </div>
  </div>
  <hr />
</div>
</template>

<style scoped lang='scss'>

</style>