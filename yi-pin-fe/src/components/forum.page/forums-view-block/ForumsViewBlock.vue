<script setup lang="ts">

import ProfileSide from "@/components/forum.page/forums-view-block/profile-side/ProfileSide.vue";
import PostListSide from "@/components/forum.page/forums-view-block/post-list-side/PostListSide.vue";
import {inject, provide} from "vue";
import type {Session} from "@/entities/session";
const session = inject<Session>('session')!

const emits = defineEmits<{
  (e: 'editing'): void
}>()

</script>

<template>
<div class="flex h-full">
   <div class="flex-1 shadow p-2 m-1 h-full transition-all duration-500">
       <PostListSide class="container h-full"></PostListSide>
   </div>
   <div class="w-1/3 d-none d-md-block shadow p-2 m-1 transition-all duration-500 h-full">
       <div v-if="session.user">
           <ProfileSide @editing="emits('editing')"></ProfileSide>
       </div>
       <div v-else class="text-center flex align-items-center justify-content-evenly h-full">
           <div class="h2">
               登录发帖
           </div>
       </div>
    </div>
</div>
</template>

<style scoped lang="scss">

</style>