<script setup lang="ts">

import TestTrain from "@/components/main.page/areas/tests-trains/TestTrain.vue";

const title = 'Since 2023'
const subTitle = '面试培训简介'
const imgSrc = '/test-trains/interview.jpg'
const paras = [
    '面试技巧教授课程采用一对一制，每天两节课，每节课大约为两个小时，中间包含一次十分钟的休息时间。考虑到面试技巧教授的特殊性，“奕品教育”仅支持线下授课和直播授课这两种授课形式。',
    '面试培训时，我们会派出有相关经验的老师对学员进行面试培训，教学内容包括面试细节教学，相关常用问题如何回答教学，以及一些面试技巧提高学员们的面试通过率。'
]

</script>

<template>
<div class="h-full">
    <el-scrollbar>
        <div class="w-full flex justify-content-center my-3 h-full">
            <div class="w-3/4">
                <TestTrain :title="title" :sub-title="subTitle" :paras="paras" :img-src="imgSrc" :become-titles="[]"/>
            </div>
        </div>
    </el-scrollbar>
</div>
</template>

<style scoped lang="scss">

</style>