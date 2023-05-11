<script setup lang="ts">

import axios from "axios";
import {inject, nextTick, ref, watch} from "vue";
import ForumItem from "@/components/forum.page/forums-view-block/post-list-side/post-list/ForumItem.vue";
import dayjs from "dayjs";
import type {Session} from "@/entities/session";

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

const forumType = inject<any>('forumType')!
const session = inject<Session>('session')!


const allForums = ref<ForumProfileDto[]>([])

const loading = ref(true);

function refresh() {
  loading.value = true;
  if (forumType.value === 0) {
      axios.get('forum/list/forum', {
        params: {
          uid: session.user?.uid
        }
      }).then(value => {
        loading.value = false;
        nextTick(() => {
          allForums.value = value.data.data
        })
      })
        .catch(reason => {})
    } else {
      axios.get('forum/list/consult', {
        params: {
          uid: session.user?.uid
        }
      }).then(value => {
        loading.value = false
        nextTick(() => {
          allForums.value = value.data.data
        })
      })
      .catch(reason => {})
    }
}

defineExpose<{
  refresh(): void
}>({
  refresh
})

watch(
  () => forumType.value,
  () => {
    refresh()
  }, {
  immediate: true,
})

const ftr = inject<string>('ftr')!

</script>

<template>
<div class="container">
  <ul role="list" class="divide-y divide-gray-100" v-if="!loading">
    <li v-for="item of allForums.filter(e => e.title.includes(ftr))" :key="item.id" class="list-group-item">
      <ForumItem @view="onView" :fid="item.id" :title="item.title" :like="item.like" :create-time="dayjs(item['create-time'])" :comment="item.comment" :collection="item.collection"></ForumItem>
    </li>
  </ul>
  <div v-else class="flex flex-col align-items-center justify-content-around h-full">
    <div class="spinner-grow w-40 h-40 text-primary m-2"></div>
    <div class="h2">加载中...</div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>