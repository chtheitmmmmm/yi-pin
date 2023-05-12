<script setup lang="ts">
import {inject, provide, reactive} from "vue";
import axios from "axios";
import type {Session} from "@/entities/session";
import ForumViewMetaData from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewMetaData.vue";
import ForumViewBody from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewBody.vue";
import ForumViewInteractive
  from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewInteractive.vue";
import type {ForumDetail} from "@/entities/forum";
import {forumDetailTransform} from "@/entities/forum";

const props = defineProps<{
  fid: string
}>()

const emits = defineEmits<{
  (e: 'interact', fid: string, type: 'like' | 'collect' | 'comment', ifDo: boolean): void
}>()

const session = inject<Session>('session')!;

let forum: ForumDetail = reactive(
  forumDetailTransform(
    (await axios.get(`forum/${props.fid}`, {
      params: {
        uid: session.user?.uid
      }
    })).data.data
  )
)

provide('forum', forum);

function onInteract(type: 'like' | 'collect' | 'comment', ifDo: boolean) {
  emits('interact', forum.id, type, ifDo);
}

</script>

<template>
<div class="flex flex-col">
  <ForumViewMetaData></ForumViewMetaData>
  <ForumViewBody class="flex-grow"></ForumViewBody>
  <div class="h-10 flex justify-content-end align-items-center">
    <ForumViewInteractive @interact="onInteract"></ForumViewInteractive>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>