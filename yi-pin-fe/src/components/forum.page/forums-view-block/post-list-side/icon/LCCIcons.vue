<script setup lang="ts">

import LCCIcon from "@/components/forum.page/forums-view-block/post-list-side/icon/LCCIcon.vue";
import type {InteractType} from "@/components/forum.page/forums-view-block/post-list-side/PostListSide.vue";

const emits = defineEmits<{
  (e: 'interact', type: InteractType): void
}>()

defineProps<{
  like: number,
  comment: number,
  collection: number,
  ifLike: boolean,
  ifCollected: boolean,
}>()

function onInteract(type: InteractType) {
  emits('interact', type)
}

</script>

<template>
<div class="flex align-items-center">
  <LCCIcon :data="like" type="like" :color="ifLike ? 'green' : 'gray'" class="mx-1" @interact="onInteract"></LCCIcon>
  <LCCIcon :data="comment" type="comment" color="gray" class="mx-1" @interact="onInteract"></LCCIcon>
  <LCCIcon :data="collection" type="collection" :color="ifCollected ? 'green' : 'gray'" class="mx-1" @interact="onInteract"></LCCIcon>
</div>
</template>

<style scoped lang="postcss">

</style>