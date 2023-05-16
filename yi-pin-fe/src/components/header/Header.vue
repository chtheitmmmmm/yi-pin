<script setup lang='ts'>
import Logo from "./Logo.vue";
import NavItem from './NavItem.vue';
import type { NavItemArea } from '@/components/header/NavItem.vue';
import Login from '@/components/header/Login.vue';
import Profile from '@/components/header/Profile.vue';
import {useSessionStore} from "@/stores/session";

defineProps<{
  pages: {
    phrase: string,
    paths: string | [string, string][],
    component: any,
    name: string,
  }[]
}>()

const session = useSessionStore();

const emits = defineEmits<{
  (e: "rl", ifRegister: boolean): void,
}>()

function onRl(ifRegister: boolean) {
  emits('rl', ifRegister)
}

</script>

<template>
<div class="text-center ctn">
  <div class='container'>
  <div class="navbar">
    <div class="nav-item d-lg-none">
        <div data-bs-toggle="offcanvas" data-bs-target="#nav-item-offcanvas">
          <div class="d-flex flex-column justify-content-around split-btn">
              <div v-for="_ of 3" class="split-bar" :key="_"></div>
          </div>
        </div>
    </div>
    <div class="nav-item">
      <Logo class='logo'/>
    </div>
    <div tabindex="-1" class='nav-item w-50 offcanvas-lg offcanvas-start ' id="nav-item-offcanvas">
      <div class="navbar d-sm-block d-lg-flex">
        <div v-for="page of pages" class="nav-item" :key="page.name">
          <NavItem :phrase='page.phrase' :paths='page.paths'/>
        </div>
      </div>
    </div>
    <div class='nav-item'>
      <Login @rl='onRl' v-if='!session.user'/>
      <Profile v-else :user-data='session.user'/>
    </div>
  </div>
  </div>
</div>
</template>

<style scoped lang='scss'>
@use "@/assets/app" as *;

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
      height: calc($size / 6);
      background: primary_color();
    }
    &:hover .split-bar {
        background: white;
      }
  }
  #nav-item-offcanvas {
    $color: secondary_color();
    background: $color;
    > div > div:hover {
      background-color: lighten($color, 2);
    }
  }

}
</style>