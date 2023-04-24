<script setup lang='ts'>

import type { User } from '@/entities/user';
import { onMounted, reactive, ref } from 'vue';
import { Toast } from 'bootstrap';

defineProps<{
  userData: User
}>()

defineExpose<{
  show: () => void,
  hide: () => void
}>({
  show,
  hide
})

const toast = ref<HTMLDivElement | null>(null)
let theToast = reactive<Toast>({} as unknown as Toast)

function show() {
  theToast.show()
}

function hide() {
  theToast.hide()
}

onMounted(() => {
  theToast = Toast.getOrCreateInstance(toast.value!);
})

</script>

<template>
<div class="toast-container position-fixed bottom-0 end-0 p-3 w-50">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref='toast'>
    <div class="toast-header">
      <img :src='userData.profile' class="rounded me-2" alt="用户头像">
      <strong class="me-auto">{{ userData.account }}</strong>
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