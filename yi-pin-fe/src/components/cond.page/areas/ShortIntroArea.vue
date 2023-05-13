<script setup lang="ts">

import {reactive, ref} from "vue";

const introContent = reactive([
  "奕品教育有限公司（以下简称：奕品）成立于2023年，注册资金xx万元人民币，位于湖北省武汉市。奕品现有职工xx人，专业技术人员xx人，培训人数累计超过xx人。同时我们拥有强大的师资队伍，现有签约教师xx人，职业规划师xx人，合作面试官xx人。",
  "奕品是一家侧重于进行“三支一扶”体验项目，做好“三支一扶”岗位的前期实习体验和后期职业生涯规划，为更多的报考人员提供服务平台的公司。同时我司主营项目包括乡村实习体验、线上平台交流、笔面试培训、岗前业务培训、专属职业生涯规划设计等，专注于帮助学员更加充分的了解岗位，更加全面的学习知识。奕品也拥有相应岗位的实习基地，例如支教培训机构、支农农业大棚、与社区卫生所合作进行支医体验，和特定乡村对接进行扶贫等，用沉浸体验式的思路服务于大众。",
  "奕品现有六大服务中心，分别为：教务中心，培训中心、市场中心、行政中心、信息中心、客服中心等。我们以“提升顾客体验，创造员工价值”为企业理念，赢得良好的口碑和声誉。"
])

</script>

<template>
<div>
  <div class="ctn container">
    <img class="float-end logo m-3" alt="公司logo" src="@/assets/logo.jpg" />
    <div>
    <p class="para" v-for="para of introContent" :key="para">
      {{para}}
    </p>
  </div>
  </div>

</div>
</template>

<style scoped lang="scss">

.ctn {
  width: 80%;
  > .logo {
    width: 30%;
  }
  > div > .para {
    text-indent: 2em;
  }
}

</style>