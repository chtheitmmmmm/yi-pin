<script setup lang='ts'>

import Area from '@/components/body/Area.vue';
import type { NavItemArea } from '@/components/header/NavItem.vue';
import Banner from "@/components/body/Banner.vue";

export interface BodyArea {
  tt: string,
  slot: any   // vue 组件
  hash: string,
  props?: any,
}

withDefaults(defineProps<{
  areas: BodyArea[],
  hasBanner?: boolean
}>(), {
  hasBanner: true
})

</script>

<template>
<div>
  <div class="flex justify-content-center">
    <Banner v-if="hasBanner" class="m-auto"/>
  </div>
  <Area v-for='area in areas' :a='area' :key="area.hash">
    <component :is='area.slot' :props="area.props"/>
  </Area>
</div>
</template>

<style scoped lang="scss">

</style>