<template>
  <div class="flex flex-col">
    <div class="self-center text-6xl drop-shadow-[0px_0_8px_#0ea5e9]">PRE-SALE</div>
    <div class="flex flex-wrap flex-row justify-center p-6 gap-5">
      <div class="opacity-[0.98] flex justify-around flex-col w-full max-w-lg bg-gray-800 drop-shadow-[0px_0_3px_#9ca3af] rounded-3xl p-5 border-2 border-gray-400 text-white font-medium gap-1">
        <div class="text-2xl text-center mb-4 text-violet-500">BUY PREFUEL WITH <span class="text-yellow-300">BUSD</span></div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>pFUEL Remaining:</div>
          <div>{{formatNumber(getBalanceNumber(siteBasicInfo.preFuelRemaining, PRE_FUEL_DECIMALS), 0)}}</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Your pFUEL balance:</div>
          <div>{{formatNumber(getBalanceNumber(preFuelBalance, PRE_FUEL_DECIMALS), 0)}}</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Your BUSD balance:</div>
          <div>{{formatNumber(getBalanceNumber(busdBalance, BUSD_DECIMALS), 0)}}</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>You can buy up to:</div>
          <div>600 pFUEL</div>
        </div>
        <div v-show="preSaleStart===0" class="text-sm sm:text-base flex items-center justify-between">
          <div>Blocks til pre-sale ends:</div>
          <div class="text-violet-500">{{preSaleEnd}}</div>
        </div>
        <div class="text-xs sm:text-sm self-center my-4">Blocks remaing until presale: <span class="text-violet-500">{{preSaleStart}}</span></div>
        <div v-if="isAuthenticated">
          <div class="flex flex-col sm:flex-row justify-between gap-2" v-if="isApprovedBusdForPreSale(userPreSaleData.busdAllowance)">
            <div class="relative w-full mt-1">
              <div class="text-[0.6rem] pl-5">MAX is your max balance or $3000</div>
              <input placeholder="Buy with BUSD" type="number" v-model.number="amount" :class="amount > 3000 ? 'focus:border-red-500 focus:ring-red-500' : ''" class="text-yellow-300 bg-gray-600 border-2 border-gray-300 rounded-full  block w-full  p-2.5">
              <div class="flex absolute inset-y-1 right-0 items-center pr-0 pt-[0.9rem]">
                <button @click="setMaxBusdBalance()" class="btn-primary  px-3 pt-[0.09rem] pb-[0.09rem] rounded-2xl" type="submit">MAX</button>
              </div>
            </div>
            <button class="btn-primary w-full mr-0 sm:mt-4" :disabled="amount === 0" v-bind:class="(amount == 0 || amount > 3000)? 'bg-gray-400 opacity-20 hover:bg-gray-400 cursor-not-allowed' : '' " @click="buyPreFuel">BUY PREFUEL</button>
          </div>
          <button v-else class="btn-primary w-full" @click="approveBusdForPreSale">Approve BUSD for pre-sale</button>
        </div>
        <div v-else>
          <button v-if="!userLoading" class="w-full btn-primary" @click="loginUser()" >Connect Wallet</button>
          <div v-else class="pt-4 flex justify-center items-center" >
            <svg role="status" class="mr-2 w-9 h-9 animate-spin text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="text-sm">Signing...</span>
          </div>
        </div>
      </div>
      <div class="opacity-[0.98] flex justify-around flex-col w-full max-w-lg bg-gray-800 drop-shadow-[0px_0_3px_#9ca3af] rounded-3xl p-5 border-2 border-gray-400 text-white font-medium gap-1">
        <div class="text-2xl text-center mb-4 text-violet-500">SWAP PREFUEL FOR <span class="text-yellow-300">FUEL</span></div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>FUEL Remaining:</div>
          <div>{{formatNumber(getBalanceNumber(siteBasicInfo.fuelRemaining, FUEL_DECIMALS), 0)}}</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Your FUEL balance:</div>
          <div>{{formatNumber(getBalanceNumber(fuelBalance, FUEL_DECIMALS), 0)}}</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>You can swap for up to:</div>
          <div>600 FUEL</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Rate:</div>
          <div>1:1 Swap</div>
        </div>
        
        <div class="text-xs sm:text-sm self-center my-4">Blocks remaing until swap: <span class="text-violet-500">{{swapStart}}</span></div>
        <div v-if="isAuthenticated" >
            <button v-if="isApprovedPreFuelForSwap(userPreSaleData.preFuelAllowance)" @click="swapPreFuelForFuel" class="btn-primary w-full">Swap <span class="text-blue-900">{{formatNumber(getBalanceNumber(preFuelBalance, PRE_FUEL_DECIMALS), 0)}}</span> pFUEL for FUEL</button>
            <button v-else @click="approvePreFuelForSwap" class="btn-primary w-full">Approve PREFUEL for swap</button>
        </div>
        <div v-else>
          <button v-if="!userLoading" class="w-full btn-primary" @click="loginUser()" >Connect Wallet</button>
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
    <div class="opacity-[0.98] bg-gray-800  p-6 self-center  w-full max-w-lg rounded-xl drop-shadow-[0px_0_3px_#9ca3af] border-2 border-gray-400">
      <div class="flex flex-col">
        <div class="self-center text-2xl mb-3">Pre-sale info</div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Rate:</div>
          <div>$5 per FUEL</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Cap:</div>
          <div>600 FUEL per wallet</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Pre-sale supply:</div>
          <div>30 000</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Minted for liquidty:</div>
          <div>7 500</div>
        </div>
        <div class="text-sm sm:text-base flex items-center justify-between">
          <div>Total FUEL supply:</div>
          <div>100 000</div>
        </div>
        <div class="mt-4 text-sm sm:text-base flex items-center ">
          Initial liquidity will be supplied at 2x presale price ($10) if presale fills, or at least 1.5x presale price if not
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
import {loginUser} from "../service/loginService"
import {formatNumber, getBalanceNumber, getRawBalanceNumber} from "../utils/format"
import { getJsonRpcProvider } from '../service/contracts'
import { CONSTANTS } from '../consts/constants'
import store from '../store'

const constants = CONSTANTS[store.state.chainId]

export default {
  name: 'PreSale',
  inheritAttrs:false,
  data(){
    return {
      amount: "",
      PRE_FUEL_DECIMALS: constants.PRE_FUEL_DECIMALS,
      FUEL_DECIMALS: constants.FUEL_DECIMALS,
      BUSD_DECIMALS: constants.BUSD_DECIMALS
    }
  },
  props:{
    siteBasicInfo: {},
    currentBlock: Number,
    userPreSaleData: {}
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
    },
    preSaleStart(){
      return this.siteBasicInfo.preSaleStartBlock - this.currentBlock < 0 ? 0 : this.siteBasicInfo.preSaleStartBlock - this.currentBlock
    },
    preSaleEnd(){
      return this.siteBasicInfo.preSaleEndBlock - this.currentBlock < 0 ? 0 : this.siteBasicInfo.preSaleEndBlock - this.currentBlock
    },
    swapStart(){
      return this.siteBasicInfo.swapStartBlock - this.currentBlock < 0 ? 0 : this.siteBasicInfo.swapStartBlock - this.currentBlock
    },
    preFuelBalance(){
      return this.getBalance(this.userPreSaleData.preFuelBalance)
    },
    fuelBalance(){
      return this.getBalance(this.userPreSaleData.fuelBalance)
    },
    busdBalance(){
      return this.getBalance(this.userPreSaleData.busdBalance)
    },
  },
  methods: {
    loginUser,
    formatNumber, 
    getBalanceNumber, 
    getRawBalanceNumber,
    getBalance(balance){
      return balance ? balance : 0
    },
    getDecimals(decimals){
      return decimals ? decimals : 18
    },
    isApprovedBusdForPreSale(allowance){
      return allowance > 0
    },
    isApprovedPreFuelForSwap(allowance){
      return allowance > 0
    },
    async getCurrentBlock(){
      return await getJsonRpcProvider().getBlockNumber()
    },
    setMaxBusdBalance(){
      const rawBalance = getRawBalanceNumber(this.busdBalance)
      this.amount = rawBalance > 3000 ? 3000 : rawBalance // 3000 BUSD is the max per wallet
    },
    async approveBusdForPreSale(){
      await approveBusdForPreSale()
      this.$emit("pre-sale-user-info")
    },
    async buyPreFuel(){
      await buyPreFuel(this.amount)
      this.$emit("pre-sale-user-info")
    },
    async approvePreFuelForSwap(){
      await approvePreFuelForSwap()
      this.$emit("pre-sale-user-info")
    },
    async swapPreFuelForFuel(){
      await swapPreFuelForFuel()
      this.$emit("pre-sale-user-info")
    }
  },  
}
</script>