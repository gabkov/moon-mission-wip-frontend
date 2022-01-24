<template>
  <div class="home">
    <img alt="PDOGE logo" src="../assets/logo.png" class="logo">
    <PreSale msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PreSale from '@/components/PreSale.vue'

export default {
  name: 'Home',
  components: {
    PreSale
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