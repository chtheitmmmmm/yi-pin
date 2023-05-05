<script setup lang="ts">

const cultureParas = [
  "“帮助每一个想要志愿奉献在三支一扶岗位的人们”是我们公司创立的初心。本公司致力于为顾客提供最优质的专业服务——让不了解三支一扶的人，明白这是干什么的、为有意愿报考的人，提供实现梦想的培训助力、帮助已经服务在岗位上的人，提供各种工作上的咨询、能力技术培养以及未来的职业规划",
  "在企业内部，我们为员工提供职业生涯规划，开发人的潜能，让员工在工作的同时意识到自己的人生价值。同时，我们提供稳定的工作环境、平等的学习、培训和发展机会。鼓励员工发挥创新思维，建立团队合作精神，提高公司的效率。我们致力于长期为公司的股东创造价值，不断改变三支一扶就业环境现状。通过推出个性化的职业生涯规划、高品质的课程、优质的服务为公司、合作伙伴以及客户创造价值。",
  "搞好企业文化建设关键在于突出企业的鲜明个性，追求与众不同的特色、优势和差别性，培育出适应互联网知识经济时代要求的，能够促进企业整体素质提高、健康发展，具有自身鲜明特色的企业文化。因此，本公司定会把握企业的当下与将来的实际状况，重视挖掘提炼和提炼整理出具有企业鲜明特色的文化内涵，走出一条特色企业文化建设之路。"
]

const valueItems = [{
  "name": "创立初心",
  "description": "帮助每一个想要志愿奉献在三支一扶岗位的人们"
}, {
  "name": "公司宗旨",
  "description": "打造全过程的三支一扶服务体系"
}, {
  "name": "服务理念",
  "description": "用心对待每一个顾客"
}, {
  "name": "企业愿景",
  "description": "做最有创新意识，不断攀登高峰的三支一扶全流程服务体系先创者"
}]

</script>

<template>
<div>
  <div class="ctn container">
    <ol>
      <li>
        <h2 class="h2">一、公司文化</h2>
        <p v-for="c of cultureParas" class="p-3">
          {{c}}
        </p>
      </li>
      <li>
        <h2 class="h2">二、公司价值观</h2>
        <ul class="container list-group">
          <li v-for="v of valueItems" class="list-group-item">
            <h3 class="h3">{{v.name}}</h3>
            <p class="p-1">{{v.description}}</p>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</div>
</template>

<style scoped lang="scss">
.ctn {
  p {
    text-indent: 2em;
  }
}
</style>