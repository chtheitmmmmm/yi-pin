<script setup lang="ts">

import LikeIcon from "@/components/forum.page/forums-view-block/post-list-side/post-list/icon/LikeIcon.vue";
import CommentIcon from "@/components/forum.page/forums-view-block/post-list-side/post-list/icon/CommentIcon.vue";
import CollectionIcon from "@/components/forum.page/forums-view-block/post-list-side/post-list/icon/CollectionIcon.vue";
import type {Dayjs} from "dayjs";

const emits = defineEmits<{
  (e: 'view', fid: string): void
}>()

interface ForumProfile {
  title: string,
  createTime: Dayjs,
  like: number,
  collection: number,
  comment: number,
  fid: string
}

const props = defineProps<ForumProfile>()

const icons = [{
  icon: LikeIcon,
  data: props.like
}, {
  icon: CommentIcon,
  data: props.comment
}, {
  icon: CollectionIcon,
  data: props.collection
}]


</script>

<template>
<div class="container forum-item hover:bg-red-50">
  <div class="flex">
    <div class="w-1/2">
      <div class="forum-item-title transition-all duration-200 cursor-pointer" @click="emits('view', fid)">
        {{title}}
      </div>
      <div>{{createTime.format("YYYY-MM-DD")}}</div>
    </div>

    <div class="flex align-self-end w-1/2 justify-content-end">
      <div v-for="icon of icons" class="flex w-10 icon" >
        <component :is="icon.icon as any" ></component>
        <span class="cursor-default">{{icon.data}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "@/assets/app";

.forum-item {
  height: 5em;
  .forum-item-title {
    font-size: 2em;
    &:hover {
      color: $primary;
    }
    + div {
      font-family: sans-serif;
      font-size: 0.8em;
      font-weight: lighter;
    }
  }
  .icon {
    width: 3em;
    > *:nth-child(1) {
      $size: 1.5em;
      height: $size;
      width: $size;
      @keyframes bounce {
        /* 弹跳动画 */
        0% { padding-bottom: 0; }
        20% { padding-bottom: 10px; }
        40% { padding-bottom: 0; }
        60% { padding-bottom: 5px; }
        80% { padding-bottom: -1px; }
        100% { padding-bottom: 0; }
      }
      &:hover {
        animation: bounce 0.5s;
        + span {
          color: $primary;
        }
      }
    }

  }
}

</style>