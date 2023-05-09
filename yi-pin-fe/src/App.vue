<script setup lang='ts'>
import {links} from "@/entities/pages";
import Header from "@/components/header/Header.vue";
import RlModal from "@/components/header/rl-modal/RlModal.vue";
import type {RawUser, User} from "@/entities/user";
import {inject, nextTick, onMounted, reactive, ref} from "vue";
import LoginToast from "@/components/login-toast/LoginToast.vue";
import jsCookie from "js-cookie";
import axios from "axios";
import type {Session} from "@/entities/session";

const loginModal = ref<typeof RlModal | null>(null)
const loginToast = ref<typeof LoginToast | null>(null)
const header = ref<typeof Header | null>(null)
const session = inject<Session>('session')!

onMounted(() => {
  axios.get("user/autologin")
    .then(value => {
      login(value.data)
    })
    .catch(reason => {
    })
})

const user = reactive<{
  logined: boolean,
  data: User | null
}>({
  logined: false,
  data: null
})

function login(rawUser: RawUser) {
  session.login(rawUser)
  nextTick(() => {
    loginToast.value!.show()
  })
}

function logout() {
  if (user.logined) {
    jsCookie.remove('uid')
    user.logined = false
    user.data = null
  }
}

function onLogout() {
  logout()
}

function onRl(ir: boolean) {
  loginModal.value!.show()
}

function onLogined(u: RawUser) {
  loginModal.value!.hide()
  login(u)
}

</script>

<template>
<div class="app-ctn">
  <div class="app-header">
    <Header :pages='links as any' @rl="onRl" @logout="onLogout" ref="header"/>
  </div>
  <div class="app-page">
    <router-view></router-view>
    <LoginToast :user-data='session.user' v-if='session.user' ref='loginToast'/>
    <RlModal ref='loginModal' @logined='onLogined'/>
  </div>

</div>

</template>

<style scoped lang='scss'>
.position-sticky {
  z-index: 256;
}

.app-ctn {
  height: 100vh;
  display: flex;
  flex-direction: column;
  > .app-header {
  }
  > .app-page {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>

