<template>
  <div class="pre-sale">
    <img alt="PDOGE logo" src="../assets/logo.png" class="logo">
    <div class="text-moralis-gray" >
      <div v-if="isAuthenticated" class="mt-10">
        <button v-if="userApprovedBusd" @click="buyPreFuel">BUY PREFUEL</button>
        <button v-else @click="approveBusdForPreSale">APPROVE BUSD</button>
        <input type="number" v-model.number="amountToBuy">
        <span>PREFUEL: {{preFuelBalance}}</span>
        <span> BUSD: {{busdBalance}}</span>
        <div>
          <button v-if="userApprovedPreFuel" @click="swapPreFuelForFuel" >SWAP PREFUEL TO FUEL</button>
          <button v-else @click="approvePreFuelForSwap">APPROVE PREFUEL</button>
          <span> FUEL: {{userFuelBalance}}</span>
        </div>
      </div>
      <dir v-else>
        <button @click="login" >CONNECT WALLET</button>
      </dir>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex"
import { preFuelBalanceOf, buyPreFuel, isApprovedPreFuelForSwap, approvePreFuelForSwap} from "../service/preFuelService"
import {busdBalanceOf, isApprovedBusdForPreSale, approveBusdForPreSale} from "../service/busdService"
import {fuelBalanceOf} from "../service/fuelService"
import {swapPreFuelForFuel} from "../service/fuelReedemService"
import {loginUser} from "@/service/loginService"
import Moralis from '../plugins/moralis'
import {preFuelContract, busdContract} from "../service/contracts"
import {PRE_FUEL_TOKEN_CONTRACT} from "../consts/constants"


export default {
  name: 'PreSale',
  data(){
    return {
      amountToBuy: 50,
      preFuelBalance: 0,
      busdBalance: 0,
      userApprovedBusd: false,
      userApprovedPreFuel: false,
      fuelBalance: 0
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      userAddress: "getUserAddress"
    }),
    isAuthenticated(){
      return Object.keys(this.user).length > 0
    }
  },
  methods: {
    async buyPreFuel(){
      await buyPreFuel(this.amountToBuy)

      preFuelContract.on("PreFuelPurchased", async (from, to, boughtAmount) => {
        
        console.log(`${boughtAmount} pre fuel purchased by ${from} for ${to} BUSD`);
        
        if(this.userAddress === from.toLowerCase()){
            this.preFuelBalance = await preFuelBalanceOf(this.userAddress)
            this.busdBalance = await busdBalanceOf(this.userAddress)
        }
      });
    
    },
    async approveBusdForPreSale(){
      await approveBusdForPreSale()
      busdContract.on("Approval", (owner, spender) => {

        console.log(`${owner} approved pre-sale contract ${spender} to spend BUSD`)

        if(this.userAddress === owner.toLowerCase() || spender === PRE_FUEL_TOKEN_CONTRACT){
          this.userApprovedBusd = true
        }
      });

    },
    async login(){
      await loginUser()
    },
    async swapPreFuelForFuel(){
      await swapPreFuelForFuel()
    },
    async isUserApprovedPreFuel(){
      this.userApprovedPreFuel = await isApprovedPreFuelForSwap()
    },
    async approvePreFuelForSwap(){
      await approvePreFuelForSwap()
    }
  },  
  async mounted() {
    if(Moralis.User.current()){
      this.preFuelBalance = await preFuelBalanceOf(this.userAddress)
      this.busdBalance = await busdBalanceOf(this.userAddress)
      this.userApprovedBusd = await isApprovedBusdForPreSale();
      this.fuelBalance = await fuelBalanceOf(this.userAddress)
      this.isUserApprovedPreFuel()
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