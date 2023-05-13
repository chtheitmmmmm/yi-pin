<script setup lang="ts">
import {inject, provide, reactive, ref} from "vue";
import axios from "axios";
import type {Session} from "@/entities/session";
import ForumViewMetaData from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewMetaData.vue";
import ForumViewBody from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewBody.vue";
import ForumViewInteractive
  from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewInteractive.vue";
import type {ForumDetail} from "@/entities/forum";
import {forumDetailTransform} from "@/entities/forum";
import type { InteractType } from "@/components/forum.page/forums-view-block/post-list-side/PostListSide.vue";
import ForumViewComments
  from "@/components/forum.page/forums-view-block/post-list-side/forum-view/forum-view-comments/ForumViewComments.vue";
import RefreshButton from "@/components/forum.page/forums-view-block/post-list-side/RefreshButton.vue";

const props = defineProps<{
  fid: string
}>()

const emits = defineEmits<{
  (e: 'interact', fid: string, type: InteractType, ifDo: boolean): void
}>()

const session = inject<Session>('session')!;
const comments = ref<typeof ForumViewComments | null>(null);

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

function onInteract(type: InteractType, ifDo: boolean) {
  console.log(type)
  switch (type) {
    case "like":
      break;
    case "collection":
      break;
    case "comment":
      comments.value?.focusInputComment();
      break;
  }
  emits('interact', forum.id, type, ifDo);
}

</script>

<template>
<div class="flex flex-col">
  <div class="h-full flex-shrink-0 flex flex-col">
    <ForumViewMetaData />
    <ForumViewBody class="flex-grow" />
    <div class="h-10 flex justify-content-end align-items-center">
      <ForumViewInteractive @interact="onInteract" />
    </div>
  </div>
  <div>
    <ForumViewComments ref="comments" @submit-comment="emits('interact', '', 'comment', true)"/>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>