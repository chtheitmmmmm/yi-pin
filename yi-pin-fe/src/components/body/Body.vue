<script setup lang='ts'>

import Area from '@/components/body/Area/Area.vue';
import type { NavItemArea } from '@/components/header/NavItem.vue';
export interface BodyArea extends NavItemArea {
  tt: string,
  slot: any   // vue 组件
}
defineProps<{
  areas: BodyArea[]
}>()

</script>

<template>
  <div class='container'>
    <Area v-for='area in areas' :a='area'>
      <component :is='area.slot' />
    </Area>
  </div>
</template>
