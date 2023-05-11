<script setup lang='ts'>

import type { User } from '@/entities/user';
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";

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
<Popover class='dropdown container position-relative border-5 rounded-3 bg-info bg-opacity-10'>
  <PopoverButton>
    <div class="flex flex-col align-items-center">
      <img :src='userData.profile' alt='用户头像' />
      <div>
        <small>{{userData.account}}</small>
      </div>
    </div>
  </PopoverButton>
  <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
      <PopoverPanel class="absolute left-1/2 z-10 flex-column w-screen max-w-max -translate-x-1/2 px-4 bg-light border">
        <li class="link-secondary">
          <router-link to='/profile'>主页</router-link>
        </li>
        <li @click='onLogout' class="link-primary">
          <a>退出登录</a>
        </li>
      </PopoverPanel>
    </Transition>
</Popover>
</template>

<style scoped lang='scss'>
@import "@/assets/app";
.container {
  cursor: pointer;
  color: white;
  border-style: solid;
  padding: 0.1em 1em;
  li {
    list-style-type: none;
    text-decoration: underline;
  }

  img {
    width: 2em;
  }
}
</style>