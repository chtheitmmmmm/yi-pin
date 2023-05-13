<script setup lang="ts">

import {inject} from "vue";
import type {ForumDetail} from "@/entities/forum";
const forum = inject<ForumDetail>('forum')!

</script>

<template>
<div class="flex justify-content-between align-items-end">
  <div class="flex align-items-center w-1/2 border-2 p-2 m-2 rounded-5">
    <div class="flex-grow">
      <img :src="forum.author.profile" alt="作者头像" width="30" />
    </div>
    <div class="flex-grow">{{forum.author.account}}</div>
  </div>
  <div>
    {{forum.createTime.format('YYYY-MM-DD HH:mm:ss')}}
  </div>
</div>
</template>

<style scoped lang="scss">

</style>