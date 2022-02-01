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
                <span>STAKED {{ item.userPoolInfo.amount}}</span>
                <span> BALANCE {{POOLS.testnet[index].name}} {{item.tokenBalance}} </span>
                <input  type="number" v-model.number="amountToDeposit">
          </div>
          <button v-if="item.isApproved" @click="depositToken(index, amountToDeposit, item.lpToken)">STAKE</button>
          <button v-else @click="approveToken(item.lpToken)" >APPROVE {{POOLS.testnet[index].name}}</button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {deposit, getPoolInfo, poolLength, getUserPoolInfo} from "../service/masterChefService"
import {isApprovedMasterChef, approveTokenForMasterChef, getTokenBalanceForUser} from "../service/poolService"
import { POOLS } from "../consts/pools"

export default {
    name: "Farms",
    data(){
        return {
            amountToDeposit: 100,
            POOLS,
            poolInfos: []
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
        async depositToken(pid, amount, tokenAddress){
            const receipt = await deposit(pid, amount)
            const event = receipt.events.filter(event => event.event === "Deposit")
            const sender = event[0].args[0]
             if (sender.toLowerCase() === this.userAddress){
                 const poolIndex = this.poolInfos.findIndex((pool => pool.lpToken == tokenAddress));
                 this.poolInfos[poolIndex].tokenBalance = await getTokenBalanceForUser(tokenAddress, this.userAddress)
                 this.poolInfos[poolIndex].userPoolInfo = await getUserPoolInfo(poolIndex, this.userAddress)
             }
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
                        userPoolInfo: await getUserPoolInfo(index, this.userAddress)
                    }, poolInfo)
                this.poolInfos.push(extended)
            }
        }
    },
    async created(){
        await this.buildPoolInfo();
    }
}
</script>


<style scoped>

</style>