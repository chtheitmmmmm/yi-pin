<script setup lang='ts'>

const businesses = [{
  tt: "实习体验",
  src: ""
}, {
  tt: "笔面试培训"
}, {
  tt: "岗位业务",
}, {
  tt: "职业生涯规划"
}]

</script>

<template>
<table class='container table-primary table-hover'>
  <tbody class='card-group'>
    <tr v-for='bus of businesses' class='container bg-opacity-10 card'>
        <td class='card-header'>
          <img :src='`/bus/${bus.tt}.jpeg`' :alt='bus.tt'>
        </td>
        <td class='card-body'>

        </td>
        <td class='card-footer text-center'>
          <button class='btn btn-outline-primary'> {{ bus.tt }} </button>
        </td>
    </tr>
  </tbody>

</table>
</template>

<style scoped lang='scss'>
.card-header {
  img {
    width: 100%;
  }
}
</style>