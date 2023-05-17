<script setup lang="ts">

import Paragraph from "@/components/Paragraph.vue";

defineProps<{
  props: {
    paras: string[]
  }
}>()

</script>

<template>
<div>
  <div class="m-3">
    <Paragraph v-for="para of props.paras">
      {{para}}
    </Paragraph>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>