<script setup lang="ts">

const departs = [{
  name: "教学部",
  short: "理论课程讲解、做好排课、安排教室、调配教师等管理工作。"
}, {
  name: "教研部",
  short: "制订学科、专业授课计划(实施性计划），负责审查修订各专业（学科）的教学大纲；选定各学期、各专业的教材及教学参考书及辅导材料等；负责本室教研活动，制定学期、学年的工作计划及责任目标。"
}, {
  name: "教师培训部",
  short: "对三支一扶的授课教师，进行培训学习，增加业务能力。"
}, {
  name: "学生培训部",
  short: "包括，线上交流培训、乡村实习培训、笔试面试培训、岗前培训、职业生涯规划培训，加强学生对三支一扶的认知经验与成果累积。"
}, {
  name: "销售部",
  short: "市场调研和预测、执行销售计划、制定寻找优质顾客方案销售课程或农产品等(销售是把产品卖好)。"
}, {
  name: "营销部",
  short: "市场企划、制定销售计划、年度营销计划编制、营销收入和销售费用的管理。"
}, {
  name: "策划部",
  short: "负责公司运营方案、建立公司文化、组织实施策划活动、健全并落实业务流程、完成产品策划的协调工作。"
}, {
  name: "行政部",
  short: "负责公司行政规章制度的制定和日常管理。"
}, {
  name: "人力部",
  short: "根据岗位需求状况，制定招聘计划、做好招聘前的准备、招聘实施和招聘后的手续完备等工作。"
}, {
  name: "财务部",
  short: "资金筹集、投资、营运、分配等经济管理活动；参与企业经营预测和决策，合理配置企业生产经营所需的各项资金；建立健全财务管理体系。"
}, {
  "name": "推广部",
  "short": "制定市场计划，制定年度、季度、月度市场推广计划，并提出意见和建议。"
}, {
  "name": "合作部",
  "short": "对外开放合作管理、合作伙伴管理。"
}, {
  "name": "后勤部",
  "short": "调配公务车辆、办公设备采购，维修管理、水电、环境卫生。"
}, {
  "name": "技术部",
  "short": "负责公司技术管理工作，及时解决生产中出现的技术问题，组织实施技术开发和技术改造，负责公司技术资料的整理和归档。"
}, {
  "name": "网安部",
  "short": "负责加强网络信息安全监测，提升网络安全防护能力。"
}, {
  "name": "客户服务部",
  "short": "制定客户服务标准、维护客户关系、处理客户咨询和投诉、建立客户回访制度、团队建设、向上级反馈工作方法和流程等改进建议。"
}, {
  "name": "业务调研部",
  "short": "收集和反馈学生对公司、教师、教学设备环境等意见和建议，有助于公司开展工作时准确的把握学生的心理动态。"
}]

</script>

<template>
  <div>
    <div class="ctn container">
      <ol>
        <li class="m-3">
          <h2>一、公司组织结构</h2>
          <div>
            <p>
              在公司初建阶段，作为小型企业，我们采用直线-职能制组织结构，在直线制和职能制的基础上,取长补短而建立起来的。职能部门内的员工在价值观和工作目标上具有相似性，员工具有明确的职业阶梯，在员工技术只能发展上具有连贯性。便于上级对下级进行指挥和命令，决策迅速、命令统一、责权明确、秩序井然、灵活机动亦不失稳定，又利于发挥参谋人员作用，而且很好的避免了公司初期承担管理过高的管理费用。</p>
            <p>
              作为服务培训型项目，我们坚持“以人为本”的组织方针，运用松散、灵活的具有高度适应性的有机式组织形式来迎合行业需求。我们对公司员工进行劳动分工，但是员工的工作不设立过于标准化的规则和条例。各部门员工应掌握熟练的专业技能，并在经过培训能处理多种复杂问题。通过先期及营业后定期培训，将职业行为标准灌输到员工的头脑中，而不需要多少正式的规则和直接监督。</p>
          </div>
          <img src="/cond/org-struc.png" alt="组织架构图片"/>
        </li>
        <li class="m-3">
          <h2>二、主要部门</h2>
          <ul class="list-group">
            <li v-for="depart of departs" class="list-group-item" :key="depart.name">
              <h3 class="h3 text-info ">
                <span>{{depart.name}}</span>
              </h3>
              <p class="p-2">
                {{depart.short}}
                <span></span>
              </p>
            </li>
          </ul>
          <div style="display: flex;">
            <div style="flex: 1; text-align: end">
              <img src="/cond/struc1.png" alt="结构图谱" />
            </div>
            <div style="flex: 1">
              <img src="/cond/meeting1.png" alt="会议图1" />
              <img src="/cond/meeting2.png" alt="会议图2" />
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/app" as *;

.ctn {
  width: 90%;

  p {
    text-indent: 2em;
    &::first-letter {
      font-size: 1.3em;
      font-weight: bold;
    }
    & > span {
      width: 100%;
      display: inline-block;
      overflow: hidden;
      border-bottom: 0.05em primary_color() solid;
      font-weight: bold;
      color: primary_color();
    }
  }
  h3 {
    cursor: pointer;
    &:hover {
      text-indent: 2em;
    }
    transition: 0.3s ease;
  }
  h2 {
    text-indent: -2em;
  }
  img {
    width: 100%;
  }
  img:only-child {
    width: auto;
    height: 100%;
  }
}
</style>