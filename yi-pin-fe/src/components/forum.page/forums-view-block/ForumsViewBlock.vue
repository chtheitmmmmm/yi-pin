<script setup lang="ts">

import ProfileSide from "@/components/forum.page/forums-view-block/profile-side/ProfileSide.vue";
import PostListSide from "@/components/forum.page/forums-view-block/post-list-side/PostListSide.vue";
import {useSessionStore} from "@/stores/session";
import {provide, ref} from "vue";

const session = useSessionStore()
const refresh = ref(true);
provide('refresh', refresh);

const emits = defineEmits<{
  (e: 'editing'): void
}>()

const selection = ref<null | string>(null)

provide('selection', selection);

</script>

<template>
<div class="flex h-full">
   <div class="flex-1 shadow p-2 m-1 h-full transition-all duration-500">
       <PostListSide class="container h-full"></PostListSide>
   </div>
   <div class="w-1/3 d-none d-md-block shadow p-2 m-1 transition-all duration-500 h-full">
       <div v-if="session.user" class="h-full">
           <ProfileSide @editing="emits('editing')" class="h-full"></ProfileSide>
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