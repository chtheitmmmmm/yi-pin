<script setup lang="ts">

import ShortIntroArea from "@/components/cond.page/areas/ShortIntroArea.vue";
import OrgStrucArea from "@/components/cond.page/areas/OrgStrucArea.vue";
import CultureArea from "@/components/cond.page/areas/CultureArea.vue";
import BodyFull, {type BodyFullArea} from "@/components/body-full/BodyFull.vue";

const areas: BodyFullArea[] = [{
    phrase: "公司简介",
    hash: "short-intro",
    tt: "公司简介",
    slot: ShortIntroArea,
}, {
    phrase: "组织架构",
    hash: "org-con",
    tt: "组织架构",
    slot: OrgStrucArea,
}, {
    phrase: "公司文化及价值观",
    hash: "culture",
    tt: "公司文化及价值观",
    slot: CultureArea,
}]


</script>

<template>
<div>
  <BodyFull :areas="areas" />
</div>
</template>

<style scoped lang="scss">

</style>