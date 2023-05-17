<script setup lang='ts'>

import TrainItemBubble from "@/components/main.page/areas/std-train-area/TrainItemBubble.vue";

const links = [{
    name: "工作总结及述职报告",
}, {
    name: "思想政治，职业道德和社会公德理论知识培训"
}, {
    name: "具体业务应用技术培训"
}]
</script>

<template>
<div class="d-lg-flex bubble-outer-ctn justify-content-center align-items-center">
  <div v-for="link of links" :key="link.name" class="d-flex flex-grow-1 justify-content-center">
    <router-link to="/std-train" class="d-block">
      <TrainItemBubble class="text-center d-flex align-items-center justify-content-center">
        <div class="w-50">
           {{link.name}}
        </div>
      </TrainItemBubble>
    </router-link>
  </div>

</div>
</template>

<style scoped lang='scss'>
.bubble-outer-ctn {
  min-height: 30vh;
  color: white;
  > div {
    > a > div {
      width: 10em;
      height: 10em;
    }
  }
}
</style>