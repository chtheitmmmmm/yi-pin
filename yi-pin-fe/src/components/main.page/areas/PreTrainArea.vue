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
    <tr v-for='t of trains' class='container bg-opacity-10 card' :key="t.tt">
        <td class='card-header'>
          <img :src='`/trains/${t.tt}.jpg`' :alt='t.tt'>
        </td>
        <td class='card-body'>
        </td>
        <td class='card-footer text-center'>
          <router-link class='btn btn-outline-primary' to="/pre-train">
            <button>
              {{ t.tt }}
            </button>
          </router-link>
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