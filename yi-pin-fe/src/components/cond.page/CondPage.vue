<script setup lang="ts">

import type {BodyArea} from "@/components/body/Body.vue";
import ShortIntroArea from "@/components/cond.page/areas/ShortIntroArea.vue";
import OrgStrucArea from "@/components/cond.page/areas/OrgStrucArea.vue";
import CultureArea from "@/components/cond.page/areas/CultureArea.vue";
import Body from "@/components/body/Body.vue";
import {onMounted, ref} from "vue";

const areas: BodyArea[] = [{
  phrase: "公司简介",
  link: "area-si",
  tt: "公司简介",
  slot: ShortIntroArea,
  path: "",
  hashList: []
}, {
  phrase: "组织架构",
  link: "area-os",
  tt: "组织架构",
  slot: OrgStrucArea,
  path: "",
  hashList: []
}, {
  phrase: "公司文化及价值观",
  link: "area-cul",
  tt: "公司文化及价值观",
  slot: CultureArea,
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
    <nav id="cond-nav-of-areas" class="list-group" style="position: relative">
      <a v-for="area of areas" class="list-group-item list-group-item-action text-center" :href="`#${area.link}`" ref="anchors" :key="area.link">
          {{area.phrase}}
      </a>
    </nav>
  </div>
  <div class="areas-body">
    <Body :areas='areas' data-bs-spy="scroll" data-bs-smooth-scroll="true" data-bs-target="cond-nav-of-areas" tabindex="0" :has-banner="false"/>
  </div>
</div>
</template>

<style scoped lang="scss">
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