<script setup lang='ts'>
import axios from 'axios';
import {inject, reactive, ref} from 'vue';
import InputFormField from '@/components/header/rl-modal/InputFormField.vue';
import type {Session} from "@/entities/session";

const emits = defineEmits<{
  (e: 'close'): void
}>()

// 登录的输入
const loginInput = {
  account: '',
  password: ''
}

const session = inject<Session>('session')!

// 是否正在登录
const logging = ref(false)

// 登录错误
const loginError = reactive({
  hasError: false,
  errMessage: ''
})

function onLogin() {
  logging.value = true
  axios.get("user/login", {
    params: loginInput
  }).then(value => {
    loginError.hasError = false;
    session.login(value.data.data);
    emits('close')
  }).catch(reason => {
    loginError.hasError = true;
    if (reason.response.data.errMsg) {
      loginError.errMessage = reason.response.data.errMsg;
    } else {
      loginError.errMessage = "登录失败"
    }
  // @ts-ignore
  }).finally(() => {
    logging.value = false
  })
}
</script>

<template>
  <form name='login' @submit.prevent='onLogin' class='container'>
    <InputFormField type="text" title='账号' name='account' placeholder='3~10长度的纯数字' v-model='loginInput.account' />
    <InputFormField title='密码' name='password' placeholder='字母和数字的组合' v-model='loginInput.password' type='password'/>
    <div class='alert alert-danger' v-show='loginError.hasError'>{{ loginError.errMessage }}</div>
    <button type="submit" class="btn btn-primary text-center container" :disabled='logging'>登录</button>
  </form>
</template>

<style scoped lang='scss'>

</style>