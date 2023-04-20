<script setup lang='ts'>
import Logo from "./Logo.vue";
import NavItem from './NavItem.vue';
import type { NavItemArea } from '@/components/header/NavItem.vue';

defineProps<{
  areas: NavItemArea[]
}>()

</script>

<template>
  <div class="text-center ctn">
    <div class='container'>
    <div class="navbar">
      <div class="nav-item">
        <Logo class='logo'/>
      </div>
      <NavItem v-for='area of areas' :phrase='area.phrase' :link='area.link' />
    </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.ctn {
  background: radial-gradient(ellipse at top, #e66465, transparent),
  radial-gradient(ellipse at bottom, #80f8dc, transparent);
  .logo {
    mix-blend-mode: darken;
  }
}
</style>