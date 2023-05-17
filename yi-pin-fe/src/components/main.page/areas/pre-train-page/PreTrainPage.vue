<script setup lang="ts">

import type {BodyFullArea} from "@/components/body-full/BodyFull.vue";
import BodyFull from "@/components/body-full/BodyFull.vue";
import PreTrainPageArea from "@/components/main.page/areas/pre-train-page/PreTrainPageArea.vue";

const areas: BodyFullArea[] = [{
  phrase: '支农培训',
  tt: '支农培训',
  hash: 'train-ag',
  slot: PreTrainPageArea,
  props: {
    img: '/trains/支农培训.jpg',
    paras: [
      '支农培训是我们奕品的一大特色，对于将要去支农的人员，我们奕品有着很强的服务优势，可以给予客户最大的帮助',
      '对于支农人员，由农业专家、畜牧业专家进行教学培训。课程设置为五门——农业政策（4课时）、病虫害防治（8课时）、家畜防疫（6课时）、常用化肥农药及使用方法（10课时）以及水果、蔬菜、花卉种植方法（18课时），每门课程皆包含理论教授与实践运用两部分，确保支农人员在工作过程中有效进行农业作业。'
    ]
  }
}, {
  phrase: '支教培训',
  tt: '支教培训',
  hash: 'train-teach',
  slot: PreTrainPageArea,
  props: {
    img: '/trains/支教培训.jpg',
    paras: [
      '对于支教人员，由以往支教人员及名师进行教学。课程设置为六门——教授科目的相关知识点（18课时）、教学工具使用方法（2课时）、教学技巧（10课时）、教学理念（6课时）、心理学知识及沟通方法（6课时）、办公软件使用方法（8课时），每门课程皆包含理论教授与实践运用两部分，促进支教人员可以更快、更好地适应支教工作。'
    ]
  }
}, {
  phrase: '支医培训',
  tt: '支医培训',
  hash: 'train-doc',
  slot: PreTrainPageArea,
  props: {
    img: '/trains/支医培训.jpg',
    paras: [
      '对于支医人员，由以往支医人员以及名医教授相关知识点。课程设置为一周五节课，每节课持续两个半小时，中间有两次十分钟的休息时间，有效地促进客户在课堂上深入思考。在每次的相关知识点教授课程结束后，为客户提供诊疗与护理的模拟练习，使其在实践中有效地复习巩固、吸收运用锁教授相关知识以及大学中所学的专业知识，促进知识的整合。'
    ]
  }
}, {
  phrase: '扶贫培训',
  tt: '扶贫培训',
  hash: 'train-pov',
  slot: PreTrainPageArea,
  props: {
    img: '/trains/扶贫培训.jpg',
    paras: [
      '对于扶贫人员，由相关扶贫人员进行教学培训。课程设置为六门，分别为扶贫政策（6课时）、相关法律知识（6课时）、扶贫理论及案例（18课时）、沟通技巧（6课时）、办公软件使用方法（8课时）、思想政治教育（4课时）。在教授过程中，设置具体情境进行实例教学，而非纯理论教学，增强岗前技能培训的实用性。'
    ]
  }
}]

</script>

<template>
<div>
  <BodyFull :areas="areas" />
</div>
</template>

<style scoped lang="scss">

</style>