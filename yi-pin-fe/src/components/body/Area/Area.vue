<script setup lang='ts'>
import type { BodyArea } from '@/components/body/Body.vue';

const props = defineProps<{
  a: BodyArea
}>()

const clpLink = `clp-${props.a.link}`

</script>

<template>
<div class='container'>
  <div :id='a.link'>
    <div class='navbar'>
      <div class='h1 text-secondary' >
        {{ a.tt }}
      </div>
      <div>
        <button class='btn btn-outline-primary' data-bs-toggle='collapse' :data-bs-target='`#${clpLink}`' type='button'>
          收起
        </button>
      </div>
    </div>
    <div class='container collapse show card bg-opacity-10 bg-secondary' :id='clpLink'>
      <div class='card-body'>
        <slot></slot>
      </div>
    </div>
    <hr/>
  </div>
</div>
</template>

<style scoped lang='scss'>

</style>