<script setup lang='ts'>
import Logo from "./Logo.vue";
import NavItem from './NavItem.vue';
import type { NavItemArea } from '@/components/header/NavItem.vue';
import Login from '@/components/header/Login.vue';
import type { User } from '@/entities/user';
import { reactive } from 'vue';
import Profile from '@/components/header/Profile.vue';

defineProps<{
  areas: NavItemArea[]
}>()

defineExpose({
  onLogined
})

const emits = defineEmits<{
  (e: "rl", ifRegister: boolean): void,
  (e: "logout"): void
}>()

let user = reactive<{
  logined: boolean,
  data: User | null
}>({
  logined: false,
  data: null
})

function onRl(ifRegister: boolean) {
  emits('rl', ifRegister)
}

function onLogined(u: User) {
  user.data = u
  user.logined = true
}

function onLogout() {
  emits("logout")
  user.logined = false
  user.data = null
}

</script>

<template>
<div class="text-center ctn">
  <div class='container'>
  <div class="navbar">
    <div class="nav-item">
      <Logo class='logo'/>
    </div>
    <div class='navbar nav-item w-50'>
      <div v-for='area of areas' class='nav-item'>
        <NavItem :phrase='area.phrase' :link='area.link'/>
      </div>
    </div>
    <div class='nav-item'>
      <Login @rl='onRl' v-if='!user.logined'/>
      <Profile v-else :user-data='user.data!' @logout='onLogout'/>
    </div>
  </div>
  </div>
</div>
</template>

<style scoped lang='scss'>
.ctn {
  background: #ff5757;
  .container > .navbar {
    justify-content: space-around;
  }
}
</style>