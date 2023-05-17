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
  <div>
    <Paragraph v-for="para of props.paras">
      {{para}}
    </Paragraph>
  </div>
  <img :src="props.img" alt="图片" class="w-full"/>
</div>
</template>

<style scoped lang="scss">

</style>