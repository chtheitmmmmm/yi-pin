<script setup lang="ts">

import LCCIcon from "@/components/forum.page/forums-view-block/post-list-side/icon/LCCIcon.vue";
import axios from "axios";
import type {Session} from "@/entities/session";
import {inject} from "vue";
import type {ForumDetail} from "@/entities/forum";

const props = defineProps<{
  cid: string
}>()

const forum = inject<ForumDetail>('forum')!
const session = inject<Session>('session')!
const comment = forum.comments.find(c => c.id === props.cid)!

function onLike() {
  if (comment.like.ifLiked === false) {
    axios.post('comment-like', {
      cid: comment.id
    }, {
      headers: {
        Authorization: session.user?.uid
      }
    }).then(value => {
      comment.like.num++;
      comment.like.ifLiked = true;
      comment.like.id = value.data.data.id;
    }).catch(() => {})
  } else if (comment.like.ifLiked === true) {
    axios.delete(`comment-like/${comment.like.id}`, {
      headers: {
        Authorization: session.user?.uid
      }
    }).then(_ => {
      comment.like.num--;
      comment.like.ifLiked = false;
      delete comment.like.id
    }).catch(() => {})
  }
}

</script>

<template>
<el-card
  shadow="hover">
  <div class="flex align-items-center justify-content-between">
    <div class="flex align-items-center">
      <div class="w-20">
        <img :src="comment.author.profile" alt="评论者头像" width="30"/>
      </div>
      <div>
        {{comment.author.account}}
      </div>
    </div>
    <div class="justify-self-end">
      <LCCIcon :data="comment.like.num" type="like" :color="comment.like.ifLiked ? 'green' : 'gray'" @interact="onLike"/>
    </div>
  </div>
  <el-container class="p-3">
    {{comment.content}}
  </el-container>
  <div class="text-end small accent-green-100 non-selection">
    {{comment.time.format('YYYY-MM-DD HH:mm:ss')}}
  </div>
</el-card>
</template>

<style scoped lang="scss">

</style>