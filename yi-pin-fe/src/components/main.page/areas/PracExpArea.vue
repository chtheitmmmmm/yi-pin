<script setup lang='ts'>
const businesses = [{
  tt: "支农体验",
}, {
  tt: "支教体验"
}, {
  tt: "支医体验",
}, {
  tt: "扶贫体验"
}]

</script>

<template>
<table class='container table-primary table-hover'>
  <tbody class='card-group'>
    <tr v-for='bus of businesses' :key="bus.tt" class='container bg-opacity-10 card'>
        <td class='card-header w-full'>
          <img :src='`/praexp/${bus.tt}.jpg`' :alt='bus.tt' >
        </td>
        <td class='card-body'>

        </td>
        <td class='card-footer text-center'>
          <router-link to="/prac-exp" class='btn btn-outline-primary'>
            <button> {{ bus.tt }} </button>
          </router-link>
        </td>
    </tr>
  </tbody>

</table>
</template>

<style scoped lang='scss'>

</style>