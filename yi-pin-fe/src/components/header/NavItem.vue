<script setup lang='ts'>

export interface NavItemArea {
  phrase: string,
  link: string,
}

defineProps<NavItemArea>()
</script>

<template>
  <div class='nav-item'>
    <a :href='`#${link}`' class='nav-link'>
    {{ phrase }}
    </a>
  </div>
</template>

<style scoped lang='scss'>

.nav-item {
  a {
    font-size: 1.7em;
    text-decoration: none;
    transition: 0.3s;
    color: #4dd8ab;
    &:hover {
      color: white;
    }
  }
}
</style>