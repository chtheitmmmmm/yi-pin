<script setup lang='ts'>
import type { NavItemArea } from '@/components/header/NavItem.vue';
import Body from '@/components/body/Body.vue';
import type { BodyArea } from '@/components/body/Body.vue';
import PracExpArea from '@/components/main.page/areas/PracExpArea.vue';
import NewsArea from '@/components/main.page/areas/PreTrainArea.vue';
import TestsTrainArea from '@/components/main.page/areas/TestsTrainArea.vue';
import PlanArea from "@/components/main.page/areas/PlanArea.vue";
import {onMounted, ref} from "vue";
import CopConArea from "@/components/main.page/areas/CopConArea.vue";
import StdTrainArea from "@/components/main.page/areas/std-train-area/StdTrainArea.vue";

const areas: BodyArea[] = [{  // 简介区域
  phrase: "实习体验",
  link: "area-pe",
  tt: "实习体验",
  slot: PracExpArea,
  path: "",
  hashList: []
}, {
  phrase: "笔面试培训",
  link: "area-praexp",
  tt: "笔面试培训",
  slot: TestsTrainArea,
  path: "",
  hashList: []
}, {  // 新闻区域
  phrase: "岗前培训",
  link: "area-pre-train",
  tt: "岗前培训",
  slot: NewsArea,
  path: "",
  hashList: []
}, {
  phrase: "在岗业务",
  link: "area-std-bus",
  tt: "在岗业务",
  slot: StdTrainArea,
  path: "",
  hashList: []
}, {
    phrase: "专属职业规划",
    link: "area-plan",
    tt: "专属职业规划",
    slot: PlanArea,
    path: "",
    hashList: []
}, {
    phrase: "合作咨询",
    link: "area-copcon",
    tt: "合作咨询",
    slot: CopConArea,
    path: "",
    hashList: []
}]

const anchors = ref<HTMLAnchorElement[] | null>(null)

onMounted(() => {
    anchors.value!.forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault()  // 一个小 hack
            location.hash = a.getAttribute("href")!;
        })
    })
})

</script>

<template>
<div class="main-ctn">
  <div class="areas-index">
    <nav id="nav-of-areas" class="list-group" style="position: relative">
      <a v-for="area of areas" :key="area.link" class="list-group-item list-group-item-action text-center" :href="`#${area.link}`" ref="anchors">
          {{area.phrase}}
      </a>
    </nav>
  </div>
  <div class="areas-body">
    <Body :has-banner="true" :areas='areas' data-bs-spy="scroll" data-bs-smooth-scroll="true" data-bs-target="nav-of-areas" tabindex="0"/>
  </div>
</div>
</template>

<style scoped lang='scss'>

.main-ctn {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 4.5fr;
  height: calc(100vh - 6.5em);
  > .areas-index {
    grid-row: 1;
    grid-column: 1;
  }
  > .areas-body {
    grid-row: 1;
    grid-column: 2;
  }
  > * {
    overflow: auto;
  }
}


</style>
