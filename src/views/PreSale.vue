<template>
  <div>
    <img alt="PDOGE logo" src="../assets/logo.png" class="img-fluid logo mb-4">

    <div class="row row-cols-1 row-cols-sm-3 g-3 justify-content-center">
      <div class="col">
        <div class="shadow-lg card border-secondary border-3 h-100">
          <h5 class="card-header">BUY PREFUEL</h5>
          <div class="card-body">
            <div v-if="isAuthenticated" class="card-text">
              <span>PREFUEL: {{preFuelBalance}}</span>
              <span> BUSD: {{busdBalance}}</span>
              <input type="number" v-model.number="amountToBuy">
              <button v-if="userApprovedBusd" @click="buyPreFuel">BUY PREFUEL</button>
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
              <span> FUEL: {{userFuelBalance}}</span>
              <button v-if="userApprovedPreFuel" @click="swapPreFuelForFuel" >SWAP PREFUEL TO FUEL</button>
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
import { preFuelBalanceOf, buyPreFuel, isApprovedPreFuelForSwap, approvePreFuelForSwap} from "../service/preFuelService"
import {busdBalanceOf, isApprovedBusdForPreSale, approveBusdForPreSale} from "../service/busdService"
import {fuelBalanceOf} from "../service/fuelService"
import {swapPreFuelForFuel} from "../service/fuelReedemService"
import {loginUser} from "@/service/loginService"
import Moralis from '../plugins/moralis'
import {preFuelContract, busdContract, fuelReedemContract} from "../service/contracts"
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
      userFuelBalance: 0
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      userAddress: "getUserAddress",
      userLoading: "getUserLoading"
    }),
    isAuthenticated(){
      return Object.keys(this.user).length > 0
    }
  },
  methods: {
    async login(){
      await loginUser()
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
    async approvePreFuelForSwap(){
      await approvePreFuelForSwap()
      preFuelContract.on("Approval", (owner, spender) => {

        console.log(`${owner} approved pre-sale contract ${spender} to spend PreFuel`)

        if(this.userAddress === owner.toLowerCase() || spender === PRE_FUEL_TOKEN_CONTRACT){
          this.userApprovedPreFuel = true
        }
      });
    },
    async swapPreFuelForFuel(){
      await swapPreFuelForFuel()
      fuelReedemContract.on("PreFuelToFuel", async (sender, amount) => {

        console.log(`${sender} swapped ${amount} PreFuel for Fuel yaaay`)

        if(this.userAddress === sender.toLowerCase()){
          this.preFuelBalance = await preFuelBalanceOf(this.userAddress)
          this.userFuelBalance = await fuelBalanceOf(this.userAddress)
        }
      });
    },
  },  
  async created(){
    if(Moralis.User.current()){
      this.preFuelBalance = await preFuelBalanceOf(this.userAddress)
      this.busdBalance = await busdBalanceOf(this.userAddress)
      this.userApprovedBusd = await isApprovedBusdForPreSale();
      this.userFuelBalance = await fuelBalanceOf(this.userAddress)
      this.userApprovedPreFuel = await isApprovedPreFuelForSwap()
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