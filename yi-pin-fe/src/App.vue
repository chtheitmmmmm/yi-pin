<script setup lang='ts'>
import {links} from "@/entities/pages";
import Header from "@/components/header/Header.vue";
import RlModal from "@/components/header/rl-modal/RlModal.vue";
import { ref } from "vue";
import LoginToast from "@/components/login-toast/LoginToast.vue";
import axios from "axios";
import {useSessionStore} from "@/stores/session";

const loginModal = ref<typeof RlModal | null>(null)
const loginToast = ref<typeof LoginToast | null>(null)
const header = ref<typeof Header | null>(null)

const session = useSessionStore();

axios.get("user/autologin")
.then(value => {
  session.login(value.data.data)
})
.catch(reason => {
})

function onRl(ir: boolean) {
  loginModal.value!.show(ir)
}

</script>

<template>
<div class="app-ctn">
  <div class="app-header">
    <Header :pages='links as any' @rl="onRl" ref="header"/>
  </div>
  <div class="app-page">
    <Suspense>
      <router-view></router-view>
    </Suspense>
    <LoginToast ref='loginToast'/>
    <RlModal ref='loginModal' />
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
    min-height: 0;
  }
}
</style>

