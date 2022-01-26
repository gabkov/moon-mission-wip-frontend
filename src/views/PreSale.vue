<template>
  <div class="pre-sale">
    <img alt="PDOGE logo" src="../assets/logo.png" class="logo">
    <div class="text-moralis-gray" >
      <img alt="Moralis logo" src="../assets/logo.svg">
      <div class="mt-4">
        <div class="text-xl font-semibold">Moralis starter boilerplate</div>
        <div class="text-sm mt-1 text-moralis-green font-semibold">Powered by Vue.js</div>
      </div>
      <div class="mt-10">
        {{user}}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex"

export default {
  name: 'PreSale',
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  }
}
</script>
<style scoped>
.logo{
  max-width:30%;
  max-height:30%;
  object-fit: contain;
}
</style>