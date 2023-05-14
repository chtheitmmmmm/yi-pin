<script setup lang='ts'>

import InputFormField from '@/components/header/rl-modal/InputFormField.vue';
import {reactive, ref} from 'vue';
import axios from 'axios';
import {useSessionStore} from "@/stores/session";


const emits = defineEmits<{
  (e: "close"): void
}>()

const session = useSessionStore()

const registerInput = reactive({
  account: '',
  password: '',
  confirmPassword: ''
})

const registerError = reactive({
  hasError: false,
  errMessage: ''
})

const registering = ref(false)

function onRegister() {
  if (registerInput.password !== registerInput.confirmPassword) {
    registerError.hasError = true
    registerError.errMessage = "密码前后不一致"
  } else {
    axios.post("user/register", {
      account: registerInput.account,
      password: registerInput.password
    }).then(value => {
      registerError.hasError = false;
      session.login(value.data.data);
      emits('close')
    }).catch(reason => {
      registerError.hasError = true
      if (reason.response.data.statusCode) {
         registerError.errMessage = reason.response.data.message[0];
      } else if (reason.response.data.errCode) {
         registerError.errMessage = reason.response.data.errMsg;
      } else {
        registerError.errMessage = '注册失败'
      }
    // @ts-ignore
    }).finally(() => {
      registering.value = false
    })
  }
}

</script>

<template>
<form name='register' @submit.prevent='onRegister' class='container'>
  <InputFormField title='账号' name='account' placeholder='3~10长度的纯数字' v-model='registerInput.account' />
  <InputFormField title='密码' name='password' placeholder='字母和数字的组合' v-model='registerInput.password' type='password'/>
  <InputFormField title='确认密码' name='confirm-password' placeholder='重复以上密码' v-model='registerInput.confirmPassword' type='password' />
  <div class='alert alert-danger' v-show='registerError.hasError'>{{ registerError.errMessage }}</div>
  <button type="submit" class="btn btn-primary text-center container" :disabled='registering'>注册</button>
</form>
</template>

<style scoped lang='scss'>

</style>