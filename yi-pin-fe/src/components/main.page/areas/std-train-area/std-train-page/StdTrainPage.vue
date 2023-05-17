<script setup lang="ts">

import type {BodyFullArea} from "@/components/body-full/BodyFull.vue";
import StdTrainPageArea from "@/components/main.page/areas/std-train-area/std-train-page/StdTrainPageArea.vue";
import BodyFull from "@/components/body-full/BodyFull.vue";

const areas: BodyFullArea[] = [{
  phrase: '一．具体业务应用技术培训',
  tt: '一．具体业务应用技术培训',
  hash: 'stp-a1',
  slot: StdTrainPageArea,
  props: {
    paras: [
      '技术培训分为笔面试培训，支农培训，支医培训，支教培训，扶贫培训等。',
      '针对已报考三支一扶的人员，“奕品教育有限公司”为其提供笔面试培训服务，具体分为笔试知识点讲解课程和面试技巧教授课程。',
      '针对已被录取但还上岗的三支一扶人员,“奕品教育有限公司”为从事支医、支教、支农、扶贫工作的四类人员提供专业化、个性化、实用化的岗前技能培训，并采用小班制，一个班级大概容纳七人左右，确保客户能得到有效的指导与帮助。'
    ]
  }
}, {
  phrase: '二．思想政治，职业道德和社会公德理论知识培训',
  tt: '二．思想政治，职业道德和社会公德理论知识培训',
  hash: 'stp-a2',
  slot: StdTrainPageArea,
  props: {
    paras: [
      '针对已报考三支一扶的人员，“奕品教育有限公司”为其提供职业道德和社会公德理论知识培训，具体如下：',
      '出于建设社会主义新农村和构建社会主义和谐社会的需要，国家大力倡导高校毕业生到基层从事“三支一扶”服务，助力乡村振兴，但是在“三支一扶”服务过程中，三支一扶人员还是面临着一系列问题，例如：难以适应下乡生活、两年后的择业问题、业务不熟悉致使效率过低等。因此，“奕品教育有限公司”特推出三支一扶培训支持服务，情系乡村，服务大众，通过线上线下融合服务的手段，利用实习体验、教育培训、职业规划三者统一的方式，建构三支一扶培训支持体系，为学生及未就业人员提供就业方向，为三支一扶人员解决从岗前到岗后的一系列问题。',
      '相比于其他教育机构，我们秉持着为乡村服务、帮助每一个想要志愿奉献在三支一扶岗位的人们的初心，致力于为目标客户打造全流程服务模式，切实解决“三支一扶”服务中出现的一系列问题；我们创新运用实习体验服务方式助力客户明确就业方向、正确择岗；我们领先深耕三支一扶培训领域，助力乡村振兴，促进共同富裕。'
    ]
  }
}]

</script>

<template>
<div>
  <BodyFull :areas="areas"/>
</div>
</template>

<style scoped lang="scss">

</style>