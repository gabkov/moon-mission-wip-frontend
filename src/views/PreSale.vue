<template>
  <div class="flex flex-col">
    <div class="self-center text-6xl">PRE-SALE</div>
    <div class="flex flex-wrap flex-row justify-center p-6 gap-5">
      <div class="flex justify-around flex-col w-full max-w-lg bg-gray-800 drop-shadow-[0px_0_3px_#9ca3af] rounded-3xl p-5 border-2 border-gray-400 text-white font-medium gap-1">
        <div class="text-2xl text-center mb-4 text-violet-500">BUY PREFUEL WITH <span class="text-yellow-300">BUSD</span></div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>PREFUEL Remaining:</div>
          <div>0</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Your PREFUEL balance:</div>
          <div>{{this.formatNumber(this.getBalanceNumber(preFuelBalance, preFuelDecimals), 0)}}</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Your BUSD balance:</div>
          <div>{{this.formatNumber(this.getBalanceNumber(busdBalance, busdDecimals), 0)}}</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>You can buy up to:</div>
          <div>600 PREFUEL</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Blocks til pre-sale ends:</div>
          <div class="text-violet-500">0</div>
        </div>
        <div class="text-xs sm:text-sm self-center my-4">Blocks remaing until presale active: <span class="text-violet-500">0</span></div>
        <div v-if="isAuthenticated">
          <div class="flex flex-col sm:flex-row justify-between gap-2" v-if="isApprovedBusdForPreSale(userPreSaleData.busdAllowance)">
            <div class="relative w-full mt-1">
              <input type="number" v-model.number="amount" :class="amount > 3000 ? 'focus:border-red-500 focus:ring-red-500' : ''" class="bg-gray-600 border-2 border-gray-300 rounded-full  block w-full  p-2.5">
              <div class="flex absolute inset-y-0 right-0 items-center pr-0 ">
                <button @click="setMaxBusdBalance()" class="btn-primary  px-3 pt-[0.09rem] pb-[0.09rem] rounded-2xl" type="submit">MAX</button>
              </div>
            </div>
            <button class="btn-primary w-full" :disabled="amount === 0" v-bind:class="(amount == 0 )? 'bg-gray-400 opacity-20 hover:bg-gray-400 cursor-not-allowed' : '' " @click="buyPreFuel">BUY PREFUEL</button>
          </div>
          <button class="btn-primary w-full" v-else @click="approveBusdForPreSale">Approve BUSD for pre-sale</button>
        </div>
        <div v-else>
          <button v-if="!userLoading" class="w-full btn-primary" @click="login" >Connect Wallet</button>
          <div v-else class="pt-4 flex justify-center items-center" >
            <svg role="status" class="mr-2 w-9 h-9 animate-spin text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="text-sm">Signing...</span>
          </div>
        </div>
      </div>
      <div class="flex justify-around flex-col w-full max-w-lg bg-gray-800 drop-shadow-[0px_0_3px_#9ca3af] rounded-3xl p-5 border-2 border-gray-400 text-white font-medium gap-1">
        <div class="text-2xl text-center mb-4 text-violet-500">SWAP PREFUEL FOR <span class="text-yellow-300">FUEL</span></div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>FUEL Remaining:</div>
          <div>0</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Your FUEL balance:</div>
          <div>{{this.formatNumber(this.getBalanceNumber(fuelBalance, fuelDecimals), 0)}}</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>You can swap for up to:</div>
          <div>600 FUEL</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Rate:</div>
          <div>1:1 Swap</div>
        </div>
        
        <div class="text-xs sm:text-sm self-center my-4">Blocks remaing until swap: <span class="text-violet-500">0</span></div>
        <div v-if="isAuthenticated" >
            <button v-if="isApprovedPreFuelForSwap(userPreSaleData.preFuelAllowance)" @click="swapPreFuelForFuel" class="btn-primary w-full">Swap <span class="text-blue-900">{{preFuelBalance}}</span> PREFUEL for FUEL</button>
            <button v-else @click="approvePreFuelForSwap" class="btn-primary w-full">Approve PREFUEL for swap</button>
        </div>
        <div v-else>
          <button v-if="!userLoading" class="w-full btn-primary" @click="login" >Connect Wallet</button>
          <div v-else class="pt-4 flex justify-center items-center" >
            <svg role="status" class="mr-2 w-9 h-9 animate-spin text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="text-sm">Signing...</span>
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
import {formatNumber, getBalanceNumber, getRawBalanceNumber} from "../utils/format"


export default {
  name: 'PreSale',
  inheritAttrs:false,
  data(){
    return {
      amount: 0,
      userPreSaleData: {},
      preFuelBalance: 0,
      preFuelDecimals: 18,
      fuelBalance: 0,
      fuelDecimals: 18,
      busdBalance: 0,
      busdDecimals: 18
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
    formatNumber(num, numberOfDecimalValues) {
      return formatNumber(num, numberOfDecimalValues);
    },
    getBalanceNumber(num, decimals){
      return getBalanceNumber(num, decimals)
    },
    getRawBalanceNumber(num, decimals) {
      return getRawBalanceNumber(num, decimals);
    },
    isApprovedBusdForPreSale(allowance){
      return allowance > 0
    },
    isApprovedPreFuelForSwap(allowance){
      return allowance > 0
    },
    setMaxBusdBalance(){
      const rawBalance = getRawBalanceNumber(this.busdBalance)
      this.amount = rawBalance > 3000 ? 3000 : rawBalance // 3000 BUSD is the max per wallet
    },
    async approveBusdForPreSale(){
      await approveBusdForPreSale()
      this.userPreSaleData = await callPreSaleInfo(this.userAddress)
    },
    async buyPreFuel(){
      await buyPreFuel(this.amount)
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
      this.preFuelDecimals = this.userPreSaleData.preFuelDecimals
      this.preFuelBalance = this.userPreSaleData.preFuelBalance
      this.fuelDecimals = this.userPreSaleData.fuelDecimals
      this.fuelBalance = this.userPreSaleData.fuelBalance
      this.busdDecimals = this.userPreSaleData.busdDecimals
      this.busdBalance = this.userPreSaleData.busdBalance
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