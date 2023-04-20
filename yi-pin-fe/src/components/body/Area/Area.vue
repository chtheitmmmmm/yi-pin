<script setup lang='ts'>
import type { NavItemArea } from '@/components/header/NavItem.vue';

export interface BodyArea extends NavItemArea {
  tt: string
}

defineProps<{
  a: BodyArea
}>()

</script>

<template>
  <div :id='a.link'>
    <div class='h1' >
      {{ a.tt }}
    </div>
    <div class='container'>
      <slot name='area-content'></slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>

</style>