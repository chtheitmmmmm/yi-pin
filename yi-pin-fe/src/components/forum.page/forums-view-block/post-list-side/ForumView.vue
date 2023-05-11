<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import axios from "axios";
import {marked} from "marked";

const props = defineProps<{
  fid: string
}>()

let forum = ref({
  title: '',
  content: ''
})

const frameDoc = ref<HTMLIFrameElement | null>(null)

watch(
  () => props.fid,
  () => {
    if (props.fid) {
      axios.get('forum/item', {
        params: {
          fid: props.fid
        }
      }).then(value => {
        const d = value.data.data
        forum.value.title = d.title
        forum.value.content = marked.parse(d.content)
      }).catch(err => {
        console.log(err)
      })
    }
  }, {
    immediate: true
  })

</script>

<template>
<div>
  <div class="flex flex-col h-full">
    <div class="h1 text-center text-primary m-1">
      {{forum.title}}
    </div>
    <div class="flex-grow-1">
      <iframe sandbox="" :srcdoc="forum.content" class="w-full h-full" ref="frameDoc"></iframe>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>