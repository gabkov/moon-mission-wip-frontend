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
        <button @click="buyPreFuel">BUY</button>
        <input type="number" :value="amountToBuy">
        <span>PREFUEL: {{userPreFuelBalance}}</span>
        <span> BUSD: {{userBusdBalance}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex"
import {maxPurchaseAmount, getHumanReadableNumber, preFuelBalanceOf, buyPreFuel, busdBalanceOf} from "../service/preFuelService"

export default {
  name: 'PreSale',
  data(){
    return {
      maximumPurchase: 0,
      amountToBuy: 50
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      userPreFuelBalance: "getUserPreFuelBalance",
      userBusdBalance: "getUserBusdBalance"
    })
  },
  methods: {
    ...mapActions({
      setUserPreFuelBalance : "setUserPreFuelBalanceAsync",
      setUserBusdBalance : "setUserBusdBalanceAsync"
    }),
    async updateMaxPurchaseAmount(){
      this.maximumPurchase = getHumanReadableNumber(await maxPurchaseAmount())
    },

    async getUserPreFuelBalance(){
      this.preFuelBalance = getHumanReadableNumber(await preFuelBalanceOf(this.user.get('ethAddress')))
    },
    async buyPreFuel(){
      const result = await buyPreFuel(this.amountToBuy)
      console.log(result);
    }
  },  
  mounted() {
    preFuelBalanceOf(this.user.get('ethAddress')).then(newBalance => this.setUserPreFuelBalance(newBalance))
    busdBalanceOf(this.user.get('ethAddress')).then(newBalance => this.setUserBusdBalance(newBalance))
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