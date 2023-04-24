<script setup lang='ts'>
import Header from "@/components/header/Header.vue";
import type { NavItemArea } from '@/components/header/NavItem.vue';
import Body from '@/components/body/Body.vue';
import type { BodyArea } from '@/components/body/Body.vue';
import RlModal from '@/components/rl-modal/RlModal.vue';
import { nextTick, onMounted, reactive, ref } from 'vue';
import type { RawUser, User } from '@/entities/user';
import axios from 'axios';
import LoginToast from '@/components/login-toast/LoginToast.vue';
import jsCookie from "js-cookie"
import ShortIntroArea from '@/components/body/Area/ShortIntroArea.vue';
import NewsArea from '@/components/body/Area/NewsArea.vue';
import BlogArea from '@/components/body/Area/BlogArea.vue';

const shortIntro: BodyArea = {  // 简介区域
  phrase: "简介",
  link: "si",
  tt: "公司简介",
  slot: ShortIntroArea
}
const news: BodyArea = {  // 新闻区域
  phrase: "新闻",
  link: "news",
  tt: "新闻速阅",
  slot: NewsArea
}
const blogs: BodyArea = {
  phrase: "博客",
  link: "blogs",
  tt: "博客空间",
  slot: BlogArea
}

const areas = [shortIntro, news, blogs]

const user = reactive<{
  logined: boolean,
  data: User | null
}>({
  logined: false,
  data: null
})

const header = ref<typeof Header | null>(null)
const loginModal = ref<typeof RlModal | null>(null)
const loginToast = ref<typeof LoginToast | null>(null)

function onRl(ir: boolean) {
  loginModal.value!.show()
}

function onLogined(u: RawUser) {
  loginModal.value!.hide()
  login(u)
}

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

onMounted(() => {
  axios.get("user/autologin")
    .then(value => {
      login(value.data)
      console.log(value)
    })
    .catch(reason => {
    })
})



</script>

<template>
  <Header :areas='areas' @rl='onRl' ref='header' @logout='onLogout'/>
  <div class='container'>
    <Body :areas='areas' />
  </div>
  <RlModal ref='loginModal' @logined='onLogined'/>
  <LoginToast :user-data='user.data!' v-if='user.logined' ref='loginToast'/>
</template>

<style scoped lang='scss'>

</style>
