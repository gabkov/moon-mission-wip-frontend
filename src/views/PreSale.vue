<template>
  <div>
    <img alt="PDOGE logo" src="../assets/logo.png" class="img-fluid logo mb-4">

    <div class="row row-cols-1 row-cols-sm-3 g-3 justify-content-center">
      <div class="col">
        <div class="shadow-lg card border-secondary border-3 h-100">
          <h5 class="card-header">BUY PREFUEL</h5>
          <div class="card-body">
            <div v-if="isAuthenticated" class="card-text">
              <span>PREFUEL: {{this.formatNumber(this.getBalanceNumber(userPreSaleData.preFuelBalance, userPreSaleData.preFuelDecimals))}}</span>
              <span> BUSD: {{this.formatNumber(this.getBalanceNumber(userPreSaleData.busdBalance, userPreSaleData.busdDecimals))}}</span>
              <input type="number" v-model.number="amountToBuy">
              <button v-if="isApprovedBusdForPreSale(userPreSaleData.busdAllowance)" @click="buyPreFuel">BUY PREFUEL</button>
              <button v-else @click="approveBusdForPreSale">APPROVE BUSD</button>
            </div>
            <div class="card-text" v-else>
              <button v-if="!userLoading" @click="login" >CONNECT WALLET</button>
              <div v-else class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="shadow-lg card border-secondary border-3 h-100">
          <h5 class="card-header">SWAP FOR FUEL</h5>
          <div class="card-body">
            <div v-if="isAuthenticated" class="card-text">
              <span> FUEL: {{this.formatNumber(this.getBalanceNumber(userPreSaleData.fuelBalance, userPreSaleData.fuelDecimals))}}</span>
              <button v-if="isApprovedPreFuelForSwap(userPreSaleData.preFuelAllowance)" @click="swapPreFuelForFuel" >SWAP PREFUEL TO FUEL</button>
              <button v-else @click="approvePreFuelForSwap">APPROVE PREFUEL</button>
            </div>
            <div class="card-text" v-else>
              <button v-if="!userLoading" @click="login" >CONNECT WALLET</button>
              <div v-else class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex"
import { buyPreFuel, approvePreFuelForSwap} from "../service/preFuelService"
import {approveBusdForPreSale} from "../service/busdService"
import {swapPreFuelForFuel} from "../service/fuelReedemService"
import {loginUser} from "@/service/loginService"
import Moralis from '../plugins/moralis'
import { callPreSaleInfo } from '../utils/callHelpers'
import {formatNumber, getBalanceNumber} from "../utils/format"


export default {
  name: 'PreSale',
  data(){
    return {
      amountToBuy: 50,
      userPreSaleData: {}
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      userAddress: "getUserAddress",
      userLoading: "getUserLoading",
      chainId: "getChainId"
    }),
    isAuthenticated(){
      return Object.keys(this.user).length > 0
    }
  },
  methods: {
    async login(){
      await loginUser()
    },
    formatNumber(num){
      return formatNumber(num)
    },
    getBalanceNumber(num, decimals){
      return getBalanceNumber(num, decimals)
    },
    isApprovedBusdForPreSale(allowance){
      return allowance > 0
    },
    isApprovedPreFuelForSwap(allowance){
      return allowance > 0
    },
    async approveBusdForPreSale(){
      await approveBusdForPreSale()
      this.userPreSaleData = await callPreSaleInfo(this.userAddress)
    },
    async buyPreFuel(){
      await buyPreFuel(this.amountToBuy)
      this.userPreSaleData = await callPreSaleInfo(this.userAddress)
    
    },
    async approvePreFuelForSwap(){
      await approvePreFuelForSwap()
      this.userPreSaleData = await callPreSaleInfo(this.userAddress)
    },
    async swapPreFuelForFuel(){
      await swapPreFuelForFuel()
      this.userPreSaleData = await callPreSaleInfo(this.userAddress)
    },
  },  
  async created(){
    if(Moralis.User.current()){
      this.userPreSaleData = await callPreSaleInfo(this.userAddress)
    }
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