<script setup lang='ts'>
const businesses = [{
  tt: "支农体验",
  src: ""
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
    <tr v-for='bus of businesses' class='container bg-opacity-10 card'>
        <td class='card-header'>
          <img :src='`/praexp/${bus.tt}.jpg`' :alt='bus.tt'>
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