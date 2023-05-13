<script setup lang="ts">

import axios from "axios";
import {inject, ref} from "vue";
import ForumItem from "@/components/forum.page/forums-view-block/post-list-side/post-list/ForumItem.vue";
import dayjs from "dayjs";
import type {Session} from "@/entities/session";
import type {ForumProfile, ForumProfileDto} from "@/entities/forum";

const emits = defineEmits<{
  'view': [fid: string]
}>()

function onView(fid: string) {
  emits('view', fid)
}

const forumType = inject<any>('forumType')!;
const session = inject<Session>('session')!;
const ftr = inject<string>('ftr')!; // 搜索值

const allForums = ref<ForumProfile[]>(
  (await axios.get('forum',{
    params: {
      type: forumType.value,
      uid: session.user?.uid
    }
  })).data.data.map((dto: ForumProfileDto) => {
    dto.createTime = dayjs(dto.createTime) as any
    return dto;
  })
);

allForums.value.sort((fp1, fp2) => {
  return -fp1.createTime.diff(fp2.createTime)
})

</script>

<template>
<div class="container">
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="item of allForums.filter(e => e.title.includes(ftr))" :key="item.id" class="list-group-item">
      <ForumItem @view="onView"
                 :fid="item.id"
                 :title="item.title"
                 :like="item.like"
                 :create-time="dayjs(item.createTime)"
                 :collection="item.collection"
                 :comment-num="item.commentNum"
       ></ForumItem>
    </li>
  </ul>

</div>
</template>

<style scoped lang="scss">
</style>