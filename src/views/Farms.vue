<template>
  <div >
      <div v-for="(pool) in poolInfos" :key="pool.pid" >
          <div>stakedAmount: {{this.formatNumber(this.getBalanceNumber(pool.stakedAmount, pool.lpDecimals))}}</div>
          <div>stakedAmountUSD: {{this.formatNumber(pool.stakedAmountUSD)}}</div>
          <div>allocPoint: {{this.shortenNumber(pool.allocPoint)}}</div>
          <div>tvl: {{this.formatNumber(pool.tvl)}}</div>
          <div>poolAPR: {{pool.poolAPR}}%</div>
          <div>daily: {{pool.daily}}%</div>
          <div>{{pool.name}} Balance: {{this.formatNumber(this.getBalanceNumber(pool.stakingTokenBalance, pool.lpDecimals))}}</div>
          <div>rewards: {{this.formatNumber(pool.rewards)}}</div>
         
          <div v-if="isPoolApproved(pool.userAllowance)">
            <input  type="number" v-model.number="amountToDeposit">
            <button @click="withdrawToken(pool.pid, 0, pool.address)">HARVEST</button>
            <button @click="depositToken(pool.pid, amountToDeposit, pool.address)">STAKE</button>
            <button @click="withdrawToken(pool.pid, amountToDeposit, pool.address)">WITHDRAW</button>
          </div>
          <button v-else @click="approveToken(pool.address)" >APPROVE {{pool.name}}</button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {deposit, withdraw } from "../service/masterChefService"
import {approveTokenForMasterChef } from "../service/poolService"
import {callPoolAnalytics} from "../utils/callHelpers"
import {formatNumber, getBalanceNumber, shortenNumber} from "../utils/format"
import {CONSTANTS } from '../consts/constants'
import store from '../store'


const constants = CONSTANTS[store.state.chainId] 

export default {
    name: "Farms",
    data(){
        return {
            amountToDeposit: 100,
            poolInfos: [],
            data: {},
        
        }
    },
    computed: {
        ...mapGetters({
            user: "getUser",
            userAddress: "getUserAddress",
            userLoading: "getUserLoading",
            chainId: "getChainId",
            pools: "getPools"
        }),
        isAuthenticated(){
            return Object.keys(this.user).length > 0
        }
    },
    methods: {
        isPoolApproved(allowance){
            return allowance > 0
        },
        formatNumber(num){
            return formatNumber(num)
        },
        getBalanceNumber(num, decimals){
            return getBalanceNumber(num, decimals)
        },
        shortenNumber(num){
            return shortenNumber(num)
        },
        async updatePoolInfo(receipt, eventName, tokenAddress){
            const event = receipt.events.filter(event => event.event === eventName)
            const sender = event[0].args[0]
             if (sender.toLowerCase() === this.userAddress){
                 const poolIndex = this.poolInfos.findIndex((pool => pool.address == tokenAddress));
                 const poolInfo = await callPoolAnalytics(constants.MASTERCHEF, this.pools[poolIndex], this.userAddress)
                 const extended = Object.assign(this.pools[poolIndex], poolInfo)
                 this.poolInfos[poolIndex] = extended
             }
        },

        async depositToken(pid, amount, tokenAddress){
            const receipt = await deposit(pid, amount)
            await this.updatePoolInfo(receipt, "Deposit", tokenAddress)
        },

        async withdrawToken(pid, amount, tokenAddress){
            const receipt = await withdraw(pid, amount)
            await this.updatePoolInfo(receipt, "Withdraw", tokenAddress)
        },

        async approveToken(tokenAddress){
            const receipt = await approveTokenForMasterChef(tokenAddress)
            await this.updatePoolInfo(receipt, "Approval", tokenAddress)
        },

        async buildPoolInfo(){
            this.pools.forEach(async pool => {
                const poolInfo = await callPoolAnalytics(constants.MASTERCHEF, pool, this.userAddress)
                const extended = Object.assign(pool, poolInfo)
                this.poolInfos.push(extended)
            });
        }
    },
    async created(){
        await this.buildPoolInfo();
    }
}
</script>


<style scoped>

</style>