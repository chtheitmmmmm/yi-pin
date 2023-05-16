<script setup lang="ts">

import Paragraph from "@/components/Paragraph.vue";

defineProps<{
    title: string,
    subTitle: string,
    imgSrc: string,
    paras: string[],
    becomeTitles: number[]
}>()

</script>

<template>
<div>
    <div>
        <div class="h1 text-gray-300 ">
            {{title}}
        </div>
        <div class="sub-title">
            {{subTitle}}
        </div>
        <div class="w-full m-1">
            <img :src="imgSrc" alt="简介图片" class="w-full"/>
        </div>
    </div>
    <div>
        <Paragraph v-for="(para, i) of paras" :class="{'sub-title': becomeTitles.includes(i)}">
            {{para}}
        </Paragraph>
    </div>
</div>
</template>

<style scoped lang="scss">
.h1 {
    font-size: 5em;
}
.h5 {
    font-size: 3em;
}
.sub-title {
    text-indent: 0;
    color: deepskyblue;
    font-size: 3em;
}
</style>