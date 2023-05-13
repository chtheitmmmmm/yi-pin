<script setup lang="ts">

import {inject, ref} from "vue";
import type {ForumDetail} from "@/entities/forum";
import {ElInput} from "element-plus";
import axios from "axios";
import type {Session} from "@/entities/session";
import {ElMessage} from "element-plus";
import ForumViewComment
  from "@/components/forum.page/forums-view-block/post-list-side/forum-view/forum-view-comments/ForumViewComment.vue";

const forum = inject<ForumDetail>('forum')!
const inputComment = ref<typeof ElInput | null>(null)
const session = inject<Session>('session')!
const commenting = ref(false)
const commentContent = ref('')

const emits = defineEmits<{
  submitComment: []
}>()

defineExpose<{
  focusInputComment(): void
}>({
  focusInputComment() {
    inputComment.value?.focus()
  }
})

function onSubmitComment() {
  commenting.value = true;
  axios.post('comment', {
    fid: forum.id,
    content: commentContent.value
  }, {
    headers: {
      Authorization: session.user?.uid
    }
  }).then(() => {
    commentContent.value = ''
    ElMessage({
      type: 'success',
      message: '发布成功！'
    })
    emits('submitComment')
  }).catch(err => {
    ElMessage({
      type: 'error',
      message: err.response.data.message
        ? err.response.data.message[0]
        : err.response.data.errMsg
    })
    // @ts-ignore
  }).finally(() => {
    commenting.value = false
  })
}

</script>

<template>
<div>
  <div>评论区</div>
  <div>
    <el-form>
      <el-input
        type="textarea"
        :rows="2"
        maxlength="200"
        show-word-limit
        resize="none"
        v-model="commentContent"
        placeholder="留下精彩评论"
        class="border-primary my-1"
        input-style="font-size: 1.1em"
        ref="inputComment"
        :disabled="commenting"
      >
      </el-input>
      <div class="flex justify-content-end">
        <button
          type="button"
          class="btn btn-outline-primary my-1"
          @click="onSubmitComment"
        >
          发送
        </button>
      </div>
    </el-form>
  </div>
  <div class="list-group">
    <template v-for="comment of forum.comments" :key="comment.id" class="list-group-item">
      <ForumViewComment :cid="comment.id" class="p-1 my-1"/>
    </template>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>