<template>
  <div >
      <div v-for="(item, index) in poolInfos" :key="item.pid" >
          <div>LP TOKEN: {{item.lpToken}}</div>
          <div>ALLOCATION: {{item.allocPoint}}</div>
          <div>LAST REWARD BLOCK: {{item.lastRewardBlock}}</div>
          <div>ACC FUEL PER SHARE: {{item.accFuelPerShare}}</div>
          <div>LP SUPPLY: {{item.lpSupply}}</div>
          <div>DEPOSIT FEE: {{item.depositFeeBP}}</div>
          <div v-if="item.isApproved">
                <span>PENDING FUEL: {{item.pendingFuel}}</span>
                <span> STAKED {{ item.userPoolInfo.amount}}</span>
                <span> BALANCE {{pools[index].name}} {{item.tokenBalance}} </span>
                <input  type="number" v-model.number="amountToDeposit">
          </div>
          <div v-if="item.isApproved">
            <button @click="withdrawToken(index, 0, item.lpToken)">HARVEST</button>
            <button @click="depositToken(index, amountToDeposit, item.lpToken)">STAKE</button>
            <button @click="withdrawToken(index, amountToDeposit, item.lpToken)">WITHDRAW</button>
          </div>
          <button v-else @click="approveToken(item.lpToken)" >APPROVE {{pools[index].name}}</button>
      </div>
      {{this.formatNumber(data.fuelPerBlock)}}
      <dir></dir> 
      stakedAmount: {{this.formatNumber(this.getBalanceNumber(data.stakedAmount, data.lpDecimals))}}
      stakedAmountUSD: {{this.formatNumber(data.stakedAmountUSD)}}
      allocPoint: {{this.shortenNumber(data.allocPoint)}}
      tvl: {{this.formatNumber(data.tvl)}}
      poolAPR: {{this.shortenNumber(data.poolAPR)}}
      daily: {{data.daily}}%
      stakingTokenBalance: {{this.formatNumber(this.getBalanceNumber(data.stakingTokenBalance, data.lpDecimals))}}
      rewards: {{this.formatNumber(data.rewards)}}
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {deposit, getPoolInfo, poolLength, getUserPoolInfo, withdraw, pendingFuelForUser} from "../service/masterChefService"
import {isApprovedMasterChef, approveTokenForMasterChef, getTokenBalanceForUser} from "../service/poolService"
import {callPoolAnalytics} from "../utils/callHelpers"
import {formatNumber, getBalanceNumber, shortenNumber} from "../utils/format"
import {CONSTANTS } from '../consts/constants'
import store from '../store'
import { POOLS } from '../consts/pools'

const constants = CONSTANTS[store.state.chainId] 

export default {
    name: "Farms",
    data(){
        return {
            amountToDeposit: 100,
            poolInfos: [],
            data: {}
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
        formatNumber(num){
            return formatNumber(num)
        },
        getBalanceNumber(num, decimals){
            return getBalanceNumber(num, decimals)
        },
        shortenNumber(num){
            return shortenNumber(num)
        },
        async updatePoolInfo(receipt, eventName, pid, tokenAddress){
            const event = receipt.events.filter(event => event.event === eventName)
            const sender = event[0].args[0]
             if (sender.toLowerCase() === this.userAddress){
                 const poolIndex = this.poolInfos.findIndex((pool => pool.lpToken == tokenAddress));
                 this.poolInfos[poolIndex].tokenBalance = await getTokenBalanceForUser(tokenAddress, this.userAddress)
                 this.poolInfos[poolIndex].userPoolInfo = await getUserPoolInfo(pid, this.userAddress)
                 this.poolInfos[poolIndex].pendingFuel = await pendingFuelForUser(pid, this.userAddress)
             }
        },
        async depositToken(pid, amount, tokenAddress){
            const receipt = await deposit(pid, amount)
            await this.updatePoolInfo(receipt, "Deposit", pid, tokenAddress)
        },
        async withdrawToken(pid, amount, tokenAddress){
            const receipt = await withdraw(pid, amount)
            await this.updatePoolInfo(receipt, "Withdraw", pid, tokenAddress)
        },
        async approveToken(tokenAddress){
            const receipt = await approveTokenForMasterChef(tokenAddress)
            const sender = receipt.events[0].args[0]
            if (sender.toLowerCase() === this.userAddress){
                const poolIndex = this.poolInfos.findIndex((pool => pool.lpToken == tokenAddress));
                this.poolInfos[poolIndex].isApproved = true
            }  
        },
        async buildPoolInfo(){
            for (let index = 0; index < await poolLength(); index++) {
                const poolInfo = await getPoolInfo(index)
                const extended = Object.assign(
                    {
                        isApproved: await isApprovedMasterChef(poolInfo.lpToken), 
                        tokenBalance: await getTokenBalanceForUser(poolInfo.lpToken, this.userAddress),
                        userPoolInfo: await getUserPoolInfo(index, this.userAddress),
                        pendingFuel : await pendingFuelForUser(index, this.userAddress)
                    }, poolInfo)
                this.poolInfos.push(extended)
            }
        }
    },
    async created(){
        await this.buildPoolInfo();
        this.data = await callPoolAnalytics(constants.MASTERCHEF, POOLS[97][0], this.userAddress)
    }
}
</script>


<style scoped>

</style>