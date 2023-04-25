<script setup lang='ts'>

import FillRouterLink from "@/components/FillRouterLink.vue";

export interface NavItemArea {
  phrase: string,
  link: string,
}

defineProps<NavItemArea>()
</script>

<template>
  <div class='nav-item' style="position: relative">
    <FillRouterLink :to="link" />
    <a class='nav-link'>
    {{ phrase }}
    </a>
  </div>
</template>

<style scoped lang='scss'>

.nav-item {
  .nav-link {
    font-size: 1.7em;
    text-decoration: none;
    color: #4dd8ab;
    z-index: 10000;
    &:hover {
      color: white;
    }
  }
}
</style>