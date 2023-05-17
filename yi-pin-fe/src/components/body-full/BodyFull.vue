<script setup lang="ts">

import type {BodyArea} from "@/components/body/Body.vue";
import Body from "@/components/body/Body.vue";
import {onMounted, ref} from "vue";

export interface BodyFullArea extends BodyArea {
  phrase: string
}

withDefaults(defineProps<{
  areas: BodyFullArea[],
  ifBanner?: boolean
}>(), {
  ifBanner: false
})

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
      <a v-for="area of areas" :key="area.hash" class="list-group-item list-group-item-action text-center" :href="`#${area.hash}`" ref="anchors">
          {{area.phrase}}
      </a>
    </nav>
  </div>
  <div class="areas-body">
    <Body :has-banner="ifBanner" :areas='areas' data-bs-spy="scroll" data-bs-smooth-scroll="true" data-bs-target="nav-of-areas" tabindex="0"/>
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
