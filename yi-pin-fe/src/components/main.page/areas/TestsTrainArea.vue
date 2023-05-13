<script setup lang='ts'>

const trains = [{
  name: "笔试培训",
  src: "/trains/test1.png"
}, {
  name: "面试培训",
  src: "/trains/test2.png"
}]

</script>

<template>
<div class="card-group">
  <div v-for="t of trains" :key="t.name" class="card">
    <div class="btn btn-outline-primary card-header text-center ">
      {{t.name}}
    </div>
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