<script setup lang="ts">


</script>

<template>
<div id="banner" class="carousel slide container mt-4">
  <div class="carousel-inner">
    <div :class="{'carousel-item': true, active: i === 1}" v-for="i of 3" :key="i">
      <img :src="`/banners/p${i}.jpg`" class="d-block w-100" :alt="`banner ${i}`">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#banner" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true" v-for="_ of 2" :key="_"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#banner" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true" v-for="_ of 2" :key="_"></span>
  </button>
</div>
</template>

<style scoped lang="scss">
img {
  height: 80vh;
  overflow: hidden;
}
</style>