<script setup lang='ts'>
import axios from 'axios';
import { reactive, ref } from 'vue';
import InputFormField from '@/components/header/rl-modal/InputFormField.vue';
import { loginInputValidator } from '@/components/header/rl-modal/joiLrExtension';
import type { RawUser } from '@/entities/user';

const emits = defineEmits<{
  (e: "logined", user: RawUser): void
}>()

// 登录的输入
const loginInput = {
  account: '',
  password: ''
}

// 是否正在登录
const logging = ref(false)

// 登录错误
const loginError = reactive({
  hasError: false,
  errMessage: ''
})

function onLogin() {
  const result = loginInputValidator.validate(loginInput)
  if (result.error) {
    loginError.hasError = true;
    loginError.errMessage = result.error.details[0].message
  } else {
    logging.value = true
    axios.get("user/login", {
      params: loginInput
    }).then(value => {
      loginError.hasError = false;
      emits('logined', value.data)
    }).catch(reason => {
      loginError.hasError = true;
      loginError.errMessage = reason.response.data.message;
      // @ts-ignore
    }).finally(() => {
      logging.value = false
    })
  }
}
</script>

<template>
  <form name='login' @submit.prevent='onLogin' class='container'>
    <InputFormField title='账号' name='account' placeholder='3~10长度的纯数字' v-model='loginInput.account' />
    <InputFormField title='密码' name='password' placeholder='字母和数字的组合' v-model='loginInput.password' type='password'/>
    <div class='alert alert-danger' v-show='loginError.hasError'>{{ loginError.errMessage }}</div>
    <button type="submit" class="btn btn-primary text-center container" :disabled='logging'>登录</button>
  </form>
</template>

<style scoped lang='scss'>

</style>