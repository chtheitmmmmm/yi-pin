<script setup lang='ts'>
const trains = [{
  tt: "支农培训",
}, {
  tt: "支教培训"
}, {
  tt: "支医培训",
}, {
  tt: "扶贫培训"
}]

</script>

<template>
<table class='container table-primary table-hover'>
  <tbody class='card-group'>
    <tr v-for='t of trains' class='container bg-opacity-10 card'>
        <td class='card-header'>
          <img :src='`/trains/${t.tt}.jpg`' :alt='t.tt'>
        </td>
        <td class='card-body'>
        </td>
        <td class='card-footer text-center'>
          <button class='btn btn-outline-primary'> {{ t.tt }} </button>
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