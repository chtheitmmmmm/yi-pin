<script setup lang='ts'>

import type { User } from '@/entities/user';

defineProps<{
  userData: User
}>()

</script>

<template>
<div class='dropdown container position-relative'>
  <div class='dropdown-toggle' data-bs-toggle='dropdown'>
    <div style='display: inline-block'>
      <img :src='userData.profile' alt='用户头像'/>
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
  </ul>
</div>
</template>

<style scoped lang='scss'>
.container {
  cursor: pointer;
  color: white;
  .dropdown-item {
    position: relative;
    a {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
}
</style>