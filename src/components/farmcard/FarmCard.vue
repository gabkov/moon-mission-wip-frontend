<template>
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
      <div v-if="isAuthenticated">
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
    stakingTokenBalance: Array
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
