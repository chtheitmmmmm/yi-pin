<script setup lang='ts'>

const trains = [{
  name: "笔试培训",
  src: "/trains/test1.jpg",
  link: '/written-train'
}, {
  name: "面试培训",
  src: "/trains/test2.jpg",
  link: '/interview-train'
}]

</script>

<template>
<div class="card-group">
  <div v-for="t of trains" :key="t.name" class="card">
    <router-link :to="t.link" class="btn btn-outline-primary card-header text-center">
        {{t.name}}
    </router-link>
    <div class="card-body"></div>
    <div class="card-footer container">
      <img :src="t.src" :alt="t.name" />
    </div>
  </div>
</div>
</template>

<style scoped lang='scss'>
img {
  width: 100%;
}
</style>