<script setup lang="ts">

import {inject} from "vue";
import type {ForumDetail} from "@/entities/forum";

const forum = inject<ForumDetail>('forum')!

</script>

<template>
<div class="flex flex-col">
  <div class="h1 text-center text-primary m-1">
    {{forum.title}}
  </div>
  <div class="flex-grow-1">
    <iframe sandbox="" :srcdoc="forum.content" class="w-full h-full" ref="frameDoc"></iframe>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>