<script setup lang='ts'>
import type { NavItemArea } from '@/components/header/NavItem.vue';
import Body from '@/components/main.page/body/Body.vue';
import type { BodyArea } from '@/components/main.page/body/Body.vue';
import ShortIntroArea from '@/components/main.page/body/Area/ShortIntroArea.vue';
import NewsArea from '@/components/main.page/body/Area/NewsArea.vue';
import BlogArea from '@/components/main.page/body/Area/BlogArea.vue';
import BusArea from '@/components/main.page/body/Area/BusArea.vue';
import PlanArea from "@/components/main.page/body/Area/PlanArea.vue";
import {onMounted, ref} from "vue";

const areas = [{  // 简介区域
  phrase: "实习体验",
  link: "area-si",
  tt: "实习体验",
  slot: ShortIntroArea
}, {
  phrase: "笔面试培训",
  link: "area-bus",
  tt: "笔面试培训",
  slot: BusArea
}, {  // 新闻区域
  phrase: "岗前",
  link: "area-news",
  tt: "岗前培训",
  slot: NewsArea
}, {
  phrase: "在岗",
  link: "area-blogs",
  tt: "在岗培训",
  slot: BlogArea
}, {
    phrase: "专属职生",
    link: "area-plan",
    tt: "专属职业生涯规划",
    slot: PlanArea
}]

const anchors = ref<HTMLAnchorElement[] | null>(null)

onMounted(() => {
    anchors.value!.forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault()
            location.hash = a.getAttribute("href")!;
        })
    })
})


</script>

<template>
  <div class="main-ctn">
    <div class="areas-index">
      <nav id="nav-of-areas" class="list-group" style="position: relative">
        <a v-for="area of areas" class="list-group-item list-group-item-action text-center" :href="`#${area.link}`" ref="anchors">
            {{area.phrase}}
        </a>
      </nav>
    </div>
    <div class="areas-body">
      <Body :areas='areas' data-bs-spy="scroll" data-bs-smooth-scroll="true" data-bs-target="nav-of-areas" tabindex="0"/>
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
