<script setup lang="ts">

import {useSessionStore} from "@/stores/session";
import ProfileWLCTabs from "@/components/forum.page/forums-view-block/profile-side/profile-wlc-tabs/ProfileWLCTabs.vue";
import RefreshButton from "@/components/forum.page/forums-view-block/RefreshButton.vue";
import {nextTick, provide, ref} from "vue";

const session = useSessionStore();
const refresh = ref(true);

provide('refresh', refresh);

const emits = defineEmits<{
  (e: "editing"): void
}>()

function onRefresh() {
    refresh.value = false;
    nextTick(() => {
        refresh.value = true;
    })
}

</script>

<template>
<div class="flex flex-col align-items-center">
  <div class="w-11/12 flex align-items-center justify-content-between mt-3 mb-3 flex-shrink-0">
    <img :src="session.user!.profile" alt="用户头像" class="w-16 m-0"/>
    <span class="flex-grow-1 text-center">{{session.user!.account}}</span>
  </div>
  <div class="w-5/6 text-center flex justify-content-center align-items-center flex-shrink-0"
       style="height: 4em">
    <button type="button" class="btn btn-outline-primary transition-all duration-500 rounded-5 border-4 w-5/6" @click="emits('editing')">
      开始创作
    </button>
  </div>
  <div class="w-full flex-grow-1 min-h-0 scrollbar-hidden relative">
    <el-container class="h-full">
      <div class="absolute right-2 top-2">
          <RefreshButton @refresh="onRefresh"/>
      </div>
      <el-main>
        <ProfileWLCTabs class="h-full" />
      </el-main>
    </el-container>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>