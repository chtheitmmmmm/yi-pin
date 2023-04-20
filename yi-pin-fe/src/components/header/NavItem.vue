<script setup lang='ts'>
import NavItem from '@/components/header/NavItem.vue';

export interface NavItemArea {
  phrase: string,
  link: string,
}
defineProps<NavItemArea>()
</script>

<template>
  <div class='nav-item'>
    <a :href='`#${link}`' class=''>
    {{ phrase }}
    </a>
  </div>
</template>

<style scoped lang='scss'>
@use "bootstrap/scss/bootstrap";


$font-name: "FZBeiWeiKaiShu-S19S";
@font-face {
  font-family: $font-name;
  src: local($font-name), url("@/assets/fonts/" + $font-name + ".ttf");
}
.nav-item {
  font-family: $font-name;
  a {
    font-size: 1.7em;
    text-decoration: none;
    transition: 0.3s;
    &:hover {
      color: rgba(0, 255, 255, 0.98);
    }
  }
}
</style>