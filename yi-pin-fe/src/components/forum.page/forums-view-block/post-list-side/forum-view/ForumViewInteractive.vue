<script setup lang="ts">

import {inject} from "vue";
import LCCIcons from "@/components/forum.page/forums-view-block/post-list-side/icon/LCCIcons.vue";
import axios from "axios";
import type {Session} from "@/entities/session";
import type {ForumDetail} from "@/entities/forum";

const forum = inject<ForumDetail>('forum')!;
const session = inject<Session>('session')!;

const emits = defineEmits<{
  (e: 'interact', type: 'like' | 'collect' | 'comment', ifDo: true | false): void
}>()

function onInteract(type: 'like' | 'collection' | 'comment') {
  switch (type) {
    case "like":
      if (forum.like.ifLiked === false) {
        axios.post('like/', {
          fid: forum.id
        }, {
          headers: {
            Authorization: session.user?.uid
          }
        }).then(value => {
          forum.like.ifLiked = true;
          forum.like.num++;
          forum.like.id = value.data.data.id;
          emits('interact', 'like', true);
        }).catch(err => {
          console.log(err)
        })
      } else if (forum.like.ifLiked === true) {
        axios.delete(`like/${forum.like.id!}`, {
          headers: {
            Authorization: session.user?.uid
          }
        }).then(_ => {
          forum.like.ifLiked = false;
          forum.like.num--;
          delete forum.like.id;
          emits('interact', 'like', false);
        })
      }
      break;
    case "collection":
      if (forum.collection.ifCollected === false) {
        axios.post('collection/', {
          fid: forum.id
        }, {
          headers: {
            Authorization: session.user?.uid
          }
        }).then(value => {
          forum.collection.ifCollected = true;
          forum.collection.num++;
          forum.collection.id = value.data.data.id;
          emits('interact', 'collect', true);
        }).catch(err => {
          console.log(err)
        })
      } else if (forum.collection.ifCollected === true) {
        axios.delete(`collection/${forum.collection.id!}`, {
          headers: {
            Authorization: session.user?.uid
          }
        }).then(_ => {
          forum.collection.ifCollected = false;
          forum.collection.num--;
          delete forum.collection.id;
          emits('interact', 'collect', false);
        })
      }
      break;
    case "comment":
      break;
  }
}

</script>

<template>
<div>
  <LCCIcons
    :like="forum.like.num"
    :comment="forum.comments.length"
    :collection="forum.collection.num"
    :if-like="forum.like.ifLiked ?? false"
    :if-collected="forum.collection.ifCollected ?? false"
    @interact="onInteract"
  ></LCCIcons>
</div>
</template>

<style scoped lang="scss">

</style>