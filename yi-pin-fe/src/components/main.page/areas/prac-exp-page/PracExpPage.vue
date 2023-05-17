<script setup lang="ts">

import type {BodyFullArea} from "@/components/body-full/BodyFull.vue";
import PracExpPageArea from "@/components/main.page/areas/prac-exp-page/PracExpPageArea.vue";
import BodyFull from "@/components/body-full/BodyFull.vue";

const areas: BodyFullArea[] = [{
  phrase: '支农体验',
  tt: '支农体验',
  hash: 'exp-ag',
  slot: PracExpPageArea,
  props: {
    img: '/praexp/支农体验.jpg',
    paras: [
      '针对支农人员，推荐其前往农业基地实习以及附近农业基地参观，让其认识基础农具、农产品以及分享实习体验。',
      '支农体验时，学员可以真切下地体验支农服务具体内容，如果学员在体验服务时遇到任何问题，我们都会有农业指导老师在一旁指导工作。'
    ]
  }
}, {
  phrase: '支教体验',
  tt: '支教体验',
  hash: 'exp-teach',
  slot: PracExpPageArea,
  props: {
    img: '/praexp/支教体验.jpg',
    paras: [
      '针对支教人员，推荐其前往实地培训学校实习以及附近支教教学点参观，安排其进行公开课讲解、教案编写及分享实习体会的活动。'
    ]
  }
}, {
  phrase: '支医体验',
  tt: '支医体验',
  hash: 'exp-doc',
  slot: PracExpPageArea,
  props: {
    img: '/praexp/支医体验.jpg',
    paras: [
      '针对支医人员，推荐其前往与本公司合作的乡镇诊所实习，为其安排各种实操练习、护理练习与实习体验分享会，帮助其了解工作模式及内容；',
      '公司还会提供相关的药品，往届支医时常见的疾病问题和突发状况以及相关的解决方案，使我们的学员尽可能熟练的上岗位！'
    ]
  }
}, {
  phrase: '扶贫体验',
  tt: '扶贫体验',
  hash: 'exp-pov',
  slot: PracExpPageArea,
  props: {
    img: '/praexp/扶贫体验.jpg',
    paras: [
      '针对扶贫人员，为其提供扶贫岗位实习及扶贫人员分享会，帮助其了解扶贫单位以及扶贫岗位基本工作内容形式。'
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