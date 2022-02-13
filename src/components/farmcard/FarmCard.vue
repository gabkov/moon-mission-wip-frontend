<template>
  <Modal 
  :showModal="showModal"
  :poolName="poolName"
  :stakingTokenBalance="this.formatNumber(this.getBalanceNumber(stakingTokenBalance, lpDecimals))"
  :stakedAmount="this.formatNumber(this.getBalanceNumber(stakedAmount, lpDecimals))"
  :pid="pid"
  :poolAddress="poolAddress"
  :methodType="methodType"
  @close-modal="showModal=false"
  />
  <div class="flex justify-around flex-col self-baseline w-full max-w-sm bg-gray-800 shadow-lg rounded-3xl p-5 border-2 border-gray-600 text-white font-medium">
    <div class="divide-y divide-gray-300/50">
      <div class="pb-6 flex flex-col justify-between">
        <div class="py-1 flex items-center justify-between">
          <img class="w-16" src="https://cronosapp.cougarswap.io/images/single-token/WBTC.png" alt="">
          <div class="grid text-center">
            <div class="text-xl" >{{ poolName }}</div>
            <div class="justify-self-end bg-violet-600 shadow-md shadow-purple-800/80 rounded-full w-11">{{this.shortenNumber(allocPoint)}}X</div>
          </div>
        </div>
        <div class="py-1 self-center">Deposit fee: {{depositFeeBp / 100}}%</div>
        <div class="flex flex-col space-y-1 ">
          <div class="text-sm flex items-center justify-between">
            <div>APR:</div>
            <div>{{ poolAPR }}%</div>
          </div>
          <div class="text-sm flex items-center justify-between">
            <div>Daily APR:</div>
            <div>{{ daily }}%</div>
          </div>
          <div class="text-sm flex items-center justify-between">
            <div>EARN</div>
            <div>FUEL</div>
          </div>
        </div>
        <div class="py-3">
          <div class="text-xs"><span class="text-violet-500">Fuel</span> Earned</div>
          <div class="flex items-center justify-between">
            <div class="text-xl" >{{ this.formatNumber(rewards) }}</div>
            <button @click="$emit('withdraw-token', pid, 0, poolAddress)" class="btn-primary">Harvest</button>
          </div>
          <div class="text-xs"><span class="text-violet-500">BTC</span> staked</div>
          <div v-if="isAuthenticated">
            <div v-if="isPoolApproved(userAllowance)" class="flex items-center justify-between">
              <div class="pt-0.5">
                <div class="text-xl" >{{ this.formatNumber(this.getBalanceNumber(stakedAmount, lpDecimals)) }}</div>
                <div class="text-[10px] text-gray-500" >~{{ this.formatNumber(stakedAmountUSD) }} USD</div>
              </div>
              <div v-if="this.getBalanceNumber(stakedAmount, lpDecimals) > 0" class="flex ">
                <button @click="openModal('withdraw-token')"
                  class="inline-flex items-center justify-center p-0.5 mr-1 overflow-hidden text-sm font-extrabold rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 text-white focus:ring-1 focus:ring-cyan-800">
                  <span class="px-3.5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">－</span>
                </button>
                <button @click="openModal('deposit-token')" 
                        class="inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-extrabold rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 text-white focus:ring-1 focus:ring-cyan-800">
                  <span class="px-3.5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">＋</span>
                </button>
              </div>
              <div v-else>
                <button class="btn-primary" @click="openModal('deposit-token')">Stake</button>
              </div>
            </div>
            <div v-else class="pt-1">
              <button class="w-full btn-primary" @click="$emit('approve-token', poolAddress)" >APPROVE {{poolName}}</button>
            </div>
          </div>
            <div v-else class="pt-1">
              <button v-if="!userLoading" class="w-full btn-primary animate-pulse" @click="login" >CONNECT WALLET</button>
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
      <div class="pt-6 flex flex-col justify-between">
        <button @click="showDetails=!showDetails" class="hover:font-bold self-center">{{!showDetails ? "Details ⮛" : "Hide ⮙"}}</button> 
        <div v-if="showDetails">
          <div class="pt-2 text-md flex items-center justify-between">
            <div>Total Liquidity:</div>
            <div>${{ this.formatNumber(tvl) }}</div>
          </div>
          <div class="flex flex-col space-y-0.5 text-violet-500">
            <div class="flex">
              <a class="text-sm" href="">Get {{poolName}}</a><svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </div>
            <div class="flex">
              <a class="text-sm" href="">View Contract </a><svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </div>
            <div class="flex">
              <a class="text-sm" href="">See pair info </a><svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatNumber, getBalanceNumber, shortenNumber} from "@/utils/format"
import BigNumber from 'bignumber.js';
import { mapGetters } from "vuex"
import {loginUser} from "@/service/loginService"
import Modal from "../modal/Modal.vue"

export default {
  name: "FarmCard",
  components:{
    Modal
  },
  props: {
    pid: Number,
    poolName: String,
    stakedAmount: BigNumber,
    stakedAmountUSD: BigNumber,
    allocPoint: BigNumber,
    tvl: BigNumber,
    poolAPR: String,
    daily: String,
    rewards: BigNumber,
    poolAddress: String,
    userAllowance: BigNumber,
    lpDecimals: Number,
    stakingTokenBalance: Array,
    depositFeeBp: Number
  },
  data(){
    return {
      amountToStake: 100,
      amountToWithdraw: 0,
      showDetails: false,
      showModal: false,
      methodType: ""
    }
  },
  computed: {
        ...mapGetters({
            user: "getUser",
            userLoading: "getUserLoading",
        }),
        isAuthenticated(){
            return Object.keys(this.user).length > 0
        }
    },
  methods: {
    async login(){
      await loginUser()
    },
    isPoolApproved(allowance) {
      return allowance > 0;
    },
    formatNumber(num) {
      return formatNumber(num);
    },
    getBalanceNumber(num, decimals) {
      return getBalanceNumber(num, decimals);
    },
    shortenNumber(num) {
      return shortenNumber(num);
    },
    openModal(methodType){
        this.methodType = methodType
        this.showModal = true
    }
  },
};
</script>

<style scoped></style>
