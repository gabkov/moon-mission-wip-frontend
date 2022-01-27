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
        <button v-if="userApprovedBusd" @click="buyPreFuel">BUY PREFUEL</button>
        <button v-else @click="approve">APPROVE</button>
        <input type="number" v-model.number="amountToBuy">
        <span>PREFUEL: {{userPreFuelBalance}}</span>
        <span> BUSD: {{userBusdBalance}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations } from "vuex"
import { preFuelBalanceOf, buyPreFuel} from "../service/preFuelService"
import {busdBalanceOf, isApprovedBusdForPreSale, approve} from "../service/busdService"

export default {
  name: 'PreSale',
  data(){
    return {
      amountToBuy: 50
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      userPreFuelBalance: "getUserPreFuelBalance",
      userBusdBalance: "getUserBusdBalance",
      userApprovedBusd: "getUserApprovedBusd"
    })
  },
  methods: {
    ...mapMutations({
      setUserPreFuelBalance : "setUserPreFuelBalance",
      setUserBusdBalance : "setUserBusdBalance",
      setUserApprovedBusd : "setUserApprovedBusd"
    }),
    async buyPreFuel(){
      const result = await buyPreFuel(this.amountToBuy)
      console.log(result);
    },
    async approve(){
      await approve()
    },
  },  
  mounted() {
    preFuelBalanceOf(this.user.get('ethAddress')).then(newBalance => this.setUserPreFuelBalance(newBalance))
    busdBalanceOf(this.user.get('ethAddress')).then(newBalance => this.setUserBusdBalance(newBalance))
    isApprovedBusdForPreSale().then(result => this.setUserApprovedBusd(result))
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