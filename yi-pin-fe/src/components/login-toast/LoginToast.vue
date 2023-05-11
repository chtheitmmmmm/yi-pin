<script setup lang='ts'>

import {inject, nextTick, onMounted, reactive, ref, watch} from 'vue';
import { Toast } from 'bootstrap';
import type {Session} from "@/entities/session";

const session = inject<Session>('session')!

const toast = ref<HTMLDivElement | null>(null)
let theToast = reactive<Toast>({} as unknown as Toast)

onMounted(() => {
  watch(
  () => session.user,
  () => {
    nextTick(() => {
      if (session.user) {
        theToast = Toast.getOrCreateInstance(toast.value!);
        theToast.show()
      }
    })
  }, {
    immediate: true
  })
})

</script>

<template>
<div class="toast-container position-absolute bottom-0 end-0 p-3 w-50" v-if="session.user">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref='toast'>
    <div class="toast-header">
      <img :src='session.user.profile' class="rounded me-2" alt="用户头像">
      <strong class="me-auto">{{ session.user.account }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">欢迎回来</div>
  </div>
</div>
</template>

<style scoped lang='scss'>
img {
  width: 2em;
}
</style>