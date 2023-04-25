<script setup lang='ts'>
import Logo from "./Logo.vue";
import NavItem from './NavItem.vue';
import type { NavItemArea } from '@/components/header/NavItem.vue';
import Login from '@/components/header/Login.vue';
import type { User } from '@/entities/user';
import { reactive } from 'vue';
import Profile from '@/components/header/Profile.vue';

defineProps<{
  pages: {
    phrase: string,
    path: string,
    component: any
  }
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
    <div class="nav-item d-lg-none">
        <div data-bs-toggle="offcanvas" data-bs-target="#nav-item-offcanvas">
          <div class="d-flex flex-column justify-content-around split-btn">
              <div v-for="_ of 3" class="split-bar"></div>
          </div>
        </div>
    </div>
    <div class="nav-item">
      <Logo class='logo'/>
    </div>
    <div tabindex="-1" class='nav-item w-50 offcanvas-lg offcanvas-start ' id="nav-item-offcanvas">
      <div class="navbar d-sm-block d-lg-flex">
        <div v-for="page of pages" class="nav-item">
          <NavItem :phrase='page.phrase' :link='page.path'/>
        </div>
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
@import "@/assets/app";

.ctn {
  background: #ff5757;
  .container > .navbar {
    justify-content: space-around;
  }
  .split-btn {
    $size: 2em;
    width: $size;
    height: $size;
    .split-bar {
      height:calc($size / 6);
      background: $primary;
    }
    &:hover .split-bar {
        background: white;
      }
  }
  #nav-item-offcanvas {
    $color: $secondary;
    background: $color;
    > div > div:hover {
      background-color: lighten($color, 2);
    }
  }

}
</style>