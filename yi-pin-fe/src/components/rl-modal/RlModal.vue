<script setup lang='ts'>
import LoginForm from "./LoginForm.vue"
import RegisterForm from './RegisterForm.vue';
import { onMounted, reactive, ref } from 'vue';
import { Modal } from 'bootstrap';
import type { RawUser } from '@/entities/user';

const ifRegister = ref(false)
const modal = ref<HTMLDivElement | null>(null)
let theModal = reactive<Modal>({} as unknown as Modal)

defineExpose<{
  show: () => void,
  hide: () => void
}>({
  show,
  hide
})

const emits = defineEmits<{
  (e: "logined", user: RawUser): void
}>()

onMounted(() => {
  theModal = new Modal(modal.value!)
})

function show() {
  theModal.show()
}

function hide() {
  theModal.hide()
}

function onSwitchRl() {
  ifRegister.value = !ifRegister.value
}

function onLogined(user: RawUser) {
  emits('logined', user)
}

</script>

<template>
  <div class='modal fade' data-bs-backdrap='static' data-bs-keyboard='false' tabindex='-1' ref='modal'>
    <div class='modal-dialog'>
      <div class='modal-content'>
        <div class='modal-body'>
          <div class="btn-group container text-center" role="group">
            <input type="radio" class="btn-check" name="rl" id="register" autocomplete="off" :checked='ifRegister' @click='onSwitchRl'>
            <label class="btn btn-outline-primary" for="register">注册</label>

            <input type="radio" class="btn-check" name="rl" id="login" autocomplete="off" :checked='!ifRegister' @click='onSwitchRl'>
            <label class="btn btn-outline-primary" for="login">登录</label>
          </div>
          <div>
            <KeepAlive>
              <component :is='ifRegister ? RegisterForm : LoginForm' @logined='onLogined'/>
            </KeepAlive>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped lang='scss'>

</style>