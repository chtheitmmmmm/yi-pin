<script setup lang="ts">

import Paragraph from "@/components/Paragraph.vue";

const paras = [{
  title: '专家推介服务',
  paras: [
    '奕品教育公司有专门的专家顾问团，包括支农，支教，支医，以及扶贫四个方面，相关专家都有过带队经验，深知在学员在三支一扶时可能会遇到的问题，突发情况以及解决方案。',
    '相关专家有意向与本公司进行合作的请联系我们。'
  ]
},{
  title: '农产品助销服务',
  paras: [
    '奕品教育公司支农板块的工作人员大多数有着丰厚的农产品销售经验，当支农的学员遇到农产品成型后但无法销售和无法形成产业链时，可以向公司求助，相关人员会进行解决。',
    '有着农产品销售经验能够形成自主产业链的且有意向与本公司进行合作的优秀人才请联系我们。'
  ]
}, {
  title: '场地租借服务',
  paras: [
    '奕品教育有限公司在湖北省乃至全国各地都有着总基地，并且与当地政府企业联系后有着充沛的场地资源。',
    '有相关空余场地的企业，政府部门或个人有意向合作请联系我们。'
  ]
}]

</script>

<template>
<div class="container flex justify-content-center">
  <div class="w-3/4">
    <div v-for="para of paras">
      <div class="text-4xl m-2 text-center">
        {{para.title}}
      </div>
      <div v-for="p of para.paras">
        <Paragraph>
          {{p}}
        </Paragraph>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>