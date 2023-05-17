<script setup lang="ts">

import Paragraph from "@/components/Paragraph.vue";

defineProps<{
  props: {
    title: string,
    paras: Array<string | {
      title: string,
      paras: string[]
    }>
  }
}>()

</script>

<template>
<div>
  <div>
    <div v-for="para of props.paras">
      <div v-if="typeof para === 'object'">
        <div class="text-2xl">
          {{para.title}}
        </div>
        <div>
          <div v-for="p of para.paras">
            <Paragraph>
              {{p}}
            </Paragraph>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <Paragraph>
            {{para}}
          </Paragraph>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>