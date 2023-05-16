<script setup lang='ts'>

import {useSessionStore} from "@/stores/session";

const session = useSessionStore();

</script>

<template>
<div class='container'>
  <div>
    <img  alt='用户头像' :src="session.user!.profile"/>
  </div>
</div>
</template>

<style scoped lang='scss'>

</style>