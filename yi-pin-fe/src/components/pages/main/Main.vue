<script setup lang='ts'>
import Header from "@/components/header/Header.vue";
import type { NavItemArea } from '@/components/header/NavItem.vue';
import Body from '@/components/body/Body.vue';
import type { BodyArea } from '@/components/body/Area/Area.vue';

const shortIntro: BodyArea = {  // 简介区域
  phrase: "简介",
  link: "si",
  tt: "公司简介"
}
const news: BodyArea = {  // 新闻区域
  phrase: "新闻",
  link: "news",
  tt: "新闻速阅"
}
const blogs: BodyArea = {
  phrase: "博客",
  link: "blogs",
  tt: "博客空间"
}
const areas = [shortIntro, news, blogs]

</script>

<template>
  <Header :areas='areas'/>
  <div class='container'>
    <Body :areas='areas' />
  </div>
</template>

<style scoped lang='scss'>

</style>
