<script setup lang="ts">

import {inject} from "vue";
import type {Session} from "@/entities/session";

const session = inject<Session>('session')!

const emits = defineEmits<{
  (e: "editing"): void
}>()
</script>

<template>
<div class="flex flex-col align-items-center">
  <div class="w-11/12 flex align-items-center justify-content-between mt-3 mb-3">
    <img :src="session.user!.profile" alt="用户头像" class="w-16 m-0"/>
    <span class="flex-grow-1 text-center">{{session.user!.account}}</span>
  </div>
  <div class="w-5/6 text-center flex justify-content-center align-items-center"
       style="height: 4em">
    <button type="button" class="btn btn-outline-primary transition-all duration-500 rounded-5 border-4 w-5/6" @click="emits('editing')">
      开始创作
    </button>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>