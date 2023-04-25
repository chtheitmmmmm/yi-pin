<script setup lang='ts'>
const emit = defineEmits(["rl"])

function onRl(ifRegister: boolean) {
  emit("rl", ifRegister)
}
</script>

<template>
  <div class='ctn d-flex flex-column flex-lg-row'>
    <div class='btn btn-primary m-1' @click='onRl(true)'>注册</div>
    <div class='btn btn-outline-primary m-1' @click='onRl(false)'>登录</div>
  </div>
</template>

<style scoped lang='scss'>
@use "bootstrap/scss/bootstrap";
.ctn {
  background: transparent;
  button {
    width: 5em!important;
  }
}
.login-button, .register-button {
  font: {
    size: 1.2em;
  }
  transition: 0.2s;
  &:hover {
    font-size: 1.4em;
    color: #338e17;
  }
  cursor: pointer;
}

</style>