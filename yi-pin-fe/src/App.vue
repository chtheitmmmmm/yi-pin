<script setup lang='ts'>
import {links} from "@/entities/pages";
import Header from "@/components/header/Header.vue";
import RlModal from "@/components/header/rl-modal/RlModal.vue";
import type {RawUser, User} from "@/entities/user";
import {nextTick, onMounted, reactive, ref} from "vue";
import LoginToast from "@/components/login-toast/LoginToast.vue";
import jsCookie from "js-cookie";
import axios from "axios";

const loginModal = ref<typeof RlModal | null>(null)
const loginToast = ref<typeof LoginToast | null>(null)
const header = ref<typeof Header | null>(null)

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
  user.data = {
    ...rawUser,
    profile: URL.createObjectURL(
      new Blob(
        [new Int8Array(rawUser.profile.data)],
        { type: "image/png" }
      )
    )
  }
  user.logined = true;
  header.value!.onLogined(user.data)
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
    <Header :pages='links as any' @rl="onRl" @logout="onLogout" ref="header" style="grid-area: header"/>
  </div>
  <div class="app-page">
    <router-view></router-view>
    <LoginToast :user-data='user.data!' v-if='user.logined' ref='loginToast'/>
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
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  > * {
    overflow: auto;
  }
  > .app-header {
    grid-row: 1;
    grid-column: 1;
  }
  > .app-page {
    grid-row: 2;
    grid-column: 1;
  }
}
</style>

