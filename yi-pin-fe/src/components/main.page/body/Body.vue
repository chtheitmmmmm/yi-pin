<script setup lang='ts'>

import Area from '@/components/main.page/body/Area/Area.vue';
import type { NavItemArea } from '@/components/header/NavItem.vue';
import Banner from "@/components/main.page/body/Banner.vue";
export interface BodyArea extends NavItemArea {
  tt: string,
  slot: any   // vue 组件
}
defineProps<{
  areas: BodyArea[]
}>()

</script>

<template>
<div>
  <Banner />
  <Area v-for='area in areas' :a='area'>
    <component :is='area.slot' />
  </Area>
</div>


</template>
