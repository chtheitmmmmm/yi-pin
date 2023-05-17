<script setup lang="ts">

import Paragraph from "@/components/Paragraph.vue";

defineProps<{
  props: {
    img: string,
    paras: string[]
  }
}>()

</script>

<template>
<div>
  <img :src="props.img" alt="图片" class="w-full"/>
  <div>
    <Paragraph v-for="para of props.paras">
      {{para}}
    </Paragraph>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>