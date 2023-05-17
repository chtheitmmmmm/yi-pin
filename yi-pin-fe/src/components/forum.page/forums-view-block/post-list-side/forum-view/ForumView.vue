<script setup lang="ts">
import {inject, provide, reactive, ref} from "vue";
import axios from "axios";
import ForumViewMetaData from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewMetaData.vue";
import ForumViewBody from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewBody.vue";
import ForumViewInteractive
  from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewInteractive.vue";
import type {ForumDetail} from "@/entities/forum";
import {forumDetailTransform} from "@/entities/forum";
import type { InteractType } from "@/components/forum.page/forums-view-block/post-list-side/PostListSide.vue";
import ForumViewComments
  from "@/components/forum.page/forums-view-block/post-list-side/forum-view/forum-view-comments/ForumViewComments.vue";
import {useSessionStore} from "@/stores/session";
import {ElMessage} from "element-plus";

const props = defineProps<{
  fid: string
}>()

const emits = defineEmits<{
  interact: [fid: string, type: InteractType, ifDo: boolean],
  delete: []
}>()

const session = useSessionStore()
const comments = ref<typeof ForumViewComments | null>(null);
const dialogVisible = ref(false);

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

function onRemoveForum() {
  axios.delete(`forum/${forum.id}`, {
    headers: {
      Authorization: session.user?.uid
    }
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    emits('delete')
  }).catch(err => {
   ElMessage({
    type: 'error',
    message: err.response.data.message
      ? err.response.data.message[0]
      : err.response.data.errMsg ?? "删除失败"
    })
     //@ts-ignore
  }).finally(() => {
    dialogVisible.value = false;
  })
}

</script>

<template>
<div class="flex flex-col">
  <div class="h-full flex-shrink-0 flex flex-col">
    <ForumViewMetaData />
    <ForumViewBody class="flex-grow" />
    <div class="h-10 flex align-items-center justify-content-end">
      <button
        v-if="session.user && session.user.uid === forum.author.uid"
        class="btn btn-outline-danger flex align-items-center justify-content-between justify-self-start"
        @click="dialogVisible = true"
      >
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="25" height="25">
          <path d="M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z" fill="#8a8a8a" p-id="2416"></path><path d="M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z" fill="red"></path>
        </svg>
      </button>
      <el-dialog
        v-model="dialogVisible"
        title="confirm-delete"
        width="30%"
      >
        <span>你真的要删除这篇帖子吗？</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <button class="btn btn-outline-primary" @click="onRemoveForum">
              确定
            </button>
          </span>
        </template>
      </el-dialog>
      <ForumViewInteractive @interact="onInteract" class="justify-self-end"/>
    </div>
  </div>
  <div>
    <ForumViewComments ref="comments" @submit-comment="emits('interact', '', 'comment', true)"/>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>