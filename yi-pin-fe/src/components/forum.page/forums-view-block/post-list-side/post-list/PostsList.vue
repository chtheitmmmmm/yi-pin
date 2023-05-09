<script setup lang="ts">

import axios from "axios";
import {reactive, ref} from "vue";
import ForumItem from "@/components/forum.page/forums-view-block/post-list-side/post-list/ForumItem.vue";
import dayjs from "dayjs";

interface ForumProfileDto {
  id: string,
  title: string,
  'create-time': string,
  like: number,
  collection: number,
  comment: number
}

const emits = defineEmits<{
  (e: 'view', fid: string): void
}>()

function onView(fid: string) {
  emits('view', fid)
}


const allForums = ref<ForumProfileDto[]>([])

axios.get('forum/list/forum')
  .then(value => {
    console.log(value.data)
    allForums.value = value.data
  })

</script>

<template>
<div class="container">
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="item of allForums">
      <ForumItem @view="onView" :fid="item.id" :title="item.title" :like="item.like" :create-time="dayjs(item['create-time'])" :comment="item.comment" :collection="item.collection"></ForumItem>
    </li>
  </ul>
</div>
</template>

<style scoped lang="scss">

</style>