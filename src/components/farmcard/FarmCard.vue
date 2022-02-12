<template>

  <div class="bg-gray-800 shadow-lg rounded-3xl flex flex-col justify-between p-5 border-2 border-gray-600 text-white font-medium group">
    <div class="py-1 flex items-center justify-between">
      <img class="w-16" src="https://cronosapp.cougarswap.io/images/single-token/WBTC.png" alt="">
      <div class="grid text-center">
        <div>{{ poolName }}</div>
        <div class="justify-self-end bg-violet-600 shadow-md shadow-purple-800/80 rounded-full w-11">5X</div>
      </div>
    </div>
    <div class="py-1 self-center">Deposit fee: {{depositFeeBp / 100}}%</div>
    <div class="flex flex-col space-y-0.3 ">
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
        <div>{{ this.formatNumber(rewards) }}</div>
        <button @click="$emit('withdraw-token', pid, 0, poolAddress)" class="bg-sky-500 text-white focus:ring-4 font-medium text-lg rounded-lg px-5 py-2 text-center mr-2 mb-2 hover:bg-sky-700 shadow-lg shadow-blue-800/80 focus:ring-gray-800 border-gray-700">Harvest</button>
      </div>
      <div class="text-xs"><span class="text-violet-500">BTC</span> staked</div>
      <div v-if="isAuthenticated">
        <div v-if="isPoolApproved(userAllowance)" class="flex items-center justify-between">
          <div>{{ this.formatNumber(this.getBalanceNumber(stakedAmount, lpDecimals)) }}</div>
          <button class="btn-primary" @click="$emit('deposit-token', pid, amountToDeposit, poolAddress)">Stake</button>
        </div>
        <div v-else class="pt-1">
          <button class="w-full btn-primary" @click="$emit('approve-token', poolAddress)" >APPROVE {{poolName}}</button>
        </div>
      </div>
        <div v-else class="pt-1">
          <button class="w-full btn-primary" v-if="!userLoading" @click="login" >CONNECT WALLET</button>
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
  <div class="shadow-lg card border-secondary border-3 h-100">
    <div class="card-body">
      <h5 class="card-title">{{ poolName }}</h5>
      <div>stakedAmount: {{ this.formatNumber(this.getBalanceNumber(stakedAmount, lpDecimals)) }}</div>
      <div>stakedAmountUSD: {{ this.formatNumber(stakedAmountUSD) }}</div>
      <div>allocPoint: {{ this.shortenNumber(allocPoint) }}</div>
      <div>tvl: {{ this.formatNumber(tvl) }}</div>
      <div>poolAPR: {{ poolAPR }}%</div>
      <div>daily: {{ daily }}%</div>
      <div>{{ poolName }} Balance: {{this.formatNumber(this.getBalanceNumber(stakingTokenBalance, lpDecimals))}}</div>
      <div>rewards: {{ this.formatNumber(rewards) }}</div>
      <div v-if="!isAuthenticated">
        <div v-if="isPoolApproved(userAllowance)">
          <input  type="number" v-model.number="amountToDeposit">
          <button @click="$emit('withdraw-token', pid, 0, poolAddress)">HARVEST</button>
          <button @click="$emit('deposit-token', pid, amountToDeposit, poolAddress)">STAKE</button>
          <button @click="$emit('withdraw-token', pid, amountToDeposit, poolAddress)">WITHDRAW</button>
        </div>
        <button v-else @click="$emit('approve-token', poolAddress)" >APPROVE {{poolName}}</button>
      </div>
      <div class="card-text" v-else>
        <button v-if="!userLoading" @click="login" >CONNECT WALLET</button>
        <div v-else class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
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

export default {
  name: "FarmCard",
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
      amountToDeposit: 100
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
  },
};
</script>

<style scoped></style>
