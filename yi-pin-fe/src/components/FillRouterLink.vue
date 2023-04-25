<script setup lang="ts">

defineProps<{
    to: string
}>()

</script>

<template>
    <router-link :to="to" style="display: block; position: absolute" class="w-100 h-100" />
</template>

<style scoped lang="scss">

</style>