<script setup lang='ts'>

import type { User } from '@/entities/user';

defineProps<{
  userData: User
}>()

const emits = defineEmits<{
  (e: "logout"): void
}>()

function onLogout() {
  emits("logout")
}

</script>

<template>
<div class='dropdown container position-relative border-primary border-5 rounded-3 bg-info bg-opacity-10'>
  <div class='dropdown-toggle ' data-bs-toggle='dropdown'>
    <div style='display: inline-block'>
      <img :src='userData.profile' alt='用户头像' />
      <div>
        <small>{{userData.account}}</small>
      </div>
    </div>
  </div>
  <ul class='dropdown-menu'>
    <li class='dropdown-item'>
      <router-link to='/profile'></router-link>
      主页
    </li>
    <li class='dropdown-item' @click='onLogout'>
      退出登录
    </li>
  </ul>
</div>
</template>

<style scoped lang='scss'>
.container {
  cursor: pointer;
  color: white;
  border-style: solid;
  padding: 0.1em 1em;
  .dropdown-item {
    position: relative;
    alignment-baseline: center;
    a {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }


  img {
    width: 2em;
  }
}

.dropdown-toggle::after {
    display: none;
  }
</style>