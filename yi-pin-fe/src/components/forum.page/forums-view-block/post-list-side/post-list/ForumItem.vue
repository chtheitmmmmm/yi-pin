<script setup lang="ts">
import type {Dayjs} from "dayjs";
import LCCIcons from "@/components/forum.page/forums-view-block/post-list-side/icon/LCCIcons.vue";
import type { ForumCollection, ForumLike } from "@/entities/forum";

const emits = defineEmits<{
  (e: 'view', fid: string): void
}>()

interface ForumProfile {
  fid: string
  title: string,
  createTime: Dayjs,
  like: ForumLike,
  collection: ForumCollection,
  commentNum: number,
}

defineProps<ForumProfile>()


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
      <LCCIcons :like="like.num"
                :comment="commentNum"
                :if-like="like.ifLiked ?? false"
                :if-collected="collection.ifCollected ?? false"
                :collection="collection.num"
      ></LCCIcons>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@use "@/assets/app" as *;

.forum-item {
  height: 5em;
  .forum-item-title {
    font-size: 2em;
    &:hover {
      color: primary_color();
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
          color: primary_color();
        }
      }
    }

  }
}

</style>