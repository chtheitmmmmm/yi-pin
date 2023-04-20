<script setup lang='ts'>
import type { BodyArea } from '@/components/body/Area/Area.vue';
import Area from '@/components/body/Area/Area.vue';

defineProps<{
  areas: BodyArea[]
}>()
</script>

<template>
  <div>
    <Area v-for='area of areas' :a='area'></Area>
  </div>
</template>

<div>

</div>