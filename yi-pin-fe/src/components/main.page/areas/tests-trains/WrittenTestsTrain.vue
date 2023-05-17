<script setup lang="ts">

import TestTrain from "@/components/main.page/areas/tests-trains/TestTrain.vue";

const title = 'Since 2023'
const subTitle = '笔试培训简介'
const imgSrc = '/test-trains/written.jpg'
const paras = [
    '笔试知识点讲解课程采取小班制，一个班级约为七人。课程设置为每周12节课，一天上两节课，每节课约为两个半小时，中间包含两次十分钟的休息时间，并为提供多种授课形式，包括线下授课、视频网课、直播授课，供客户自由选择。',
    '授课方式和内容',
    '线下授课：机构教育老师会定期在部门开展有关三支一扶的笔试题讲解。对于时间充裕的学生，他们可以参加线下授课，老师们也会对学生的问题进行回答。',
    '视频网课：公司师资集团也会录制相关高质量教学视频，学员们也可以利用课余时间观看相关笔试题的讲解',
    '直播授课：对于没有时间且有问题的学员们，我们会安排老师进行视频答疑',
    '课程内容：公司教学为分期制，每一期会讲解三伏一直中，相关内容不同的学员可以根据不同的需求来进行选择'
]

</script>

<template>
<div class="h-full">
    <el-scrollbar>
        <div class="w-full flex justify-content-center my-3 h-full">
            <div class="w-3/4">
                <TestTrain :title="title" :sub-title="subTitle" :paras="paras" :img-src="imgSrc" :become-titles="[1]"/>
            </div>
        </div>
    </el-scrollbar>
</div>
</template>

<style scoped lang="scss">

</style>