<script setup lang='ts'>

import type { User } from '@/entities/user';

defineProps<{
  userData: User
}>()

</script>

<template>
<div class='container'>
  <div>
    <img :src='userData.profile' alt='用户头像'/>
  </div>
</div>
</template>

<style scoped lang='scss'>

</style>