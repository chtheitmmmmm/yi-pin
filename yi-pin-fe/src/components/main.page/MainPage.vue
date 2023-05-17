<script setup lang='ts'>
import type { NavItemArea } from '@/components/header/NavItem.vue';
import PracExpArea from '@/components/main.page/areas/PracExpArea.vue';
import NewsArea from '@/components/main.page/areas/PreTrainArea.vue';
import TestsTrainArea from '@/components/main.page/areas/TestsTrainArea.vue';
import PlanArea from "@/components/main.page/areas/PlanArea.vue";
import CopConArea from "@/components/main.page/areas/CopConArea.vue";
import StdTrainArea from "@/components/main.page/areas/std-train-area/StdTrainArea.vue";
import BodyFull, { type BodyFullArea} from "@/components/body-full/BodyFull.vue";

const areas: BodyFullArea[] = [{  // 简介区域
    phrase: "实习体验",
    hash: "area-pe",
    tt: "实习体验",
    slot: PracExpArea,
}, {
    phrase: "笔面试培训",
    hash: "area-praexp",
    tt: "笔面试培训",
    slot: TestsTrainArea,
}, {  // 新闻区域
    phrase: "岗前培训",
    hash: "area-pre-train",
    tt: "岗前培训",
    slot: NewsArea,
}, {
    phrase: "在岗业务",
    hash: "area-std-bus",
    tt: "在岗业务",
    slot: StdTrainArea,
}, {
    phrase: "专属职业规划",
    hash: "area-plan",
    tt: "专属职业规划",
    slot: PlanArea,
}, {
    phrase: "合作咨询",
    hash: "area-copcon",
    tt: "合作咨询",
    slot: CopConArea,
}];

</script>

<template>
<div>
  <BodyFull :areas="areas" :if-banner="true"/>
</div>
</template>

<style scoped lang='scss'>

</style>
