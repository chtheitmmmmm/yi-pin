<script setup lang='ts'>


import { onMounted, ref } from 'vue';

withDefaults(defineProps<{
  title: string,
  name: string,
  placeholder: string,
  type: string,
  modelValue: string
}>(), {
  type: 'text',
  modelValue: ''
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()


</script>

<template>
<div class='mb-3 mt-3'>
  <label :for='`input-form-field-${name}`' class="form-label h4"> {{ title }}</label>
  <input :type='type' class="form-control" :name='name' :placeholder='placeholder' :id='`input-form-field-${name}`' :value='modelValue' @input='
  //@ts-ignore
  $emit("update:modelValue", $event.target.value)
'>
</div>
</template>

<style scoped lang='scss'>

</style>