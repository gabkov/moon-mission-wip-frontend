<template>
<h2>FARMS</h2>
  <div class="row row-cols-1 row-cols-sm-3 g-3 justify-content-center">
      <div class="col" v-for="(pool) in poolInfos" :key="pool.pid" >
          <FarmCard 
          :poolName="pool.name" 
          :allocPoint="pool.allocPoint"
          :daily="pool.daily"
          :pid="pool.pid"
          :poolAddress="pool.address"
          :poolAPR="pool.poolAPR"
          :rewards="pool.rewards"
          :stakedAmount="pool.stakedAmount"
          :stakedAmountUSD="pool.stakedAmountUSD"
          :tvl="pool.tvl"
          :userAllowance="pool.userAllowance"
          :lpDecimals="pool.lpDecimals"
          :stakingTokenBalance="pool.stakingTokenBalance"
          @deposit-token="this.depositToken"
          @withdraw-token="this.withdrawToken"
          @approve-token="this.approveToken"
          />
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import FarmCard from '../components/farmcard/FarmCard.vue'
import {deposit, withdraw } from "../service/masterChefService"
import {approveTokenForMasterChef } from "../service/poolService"
import {callPoolAnalytics} from "../utils/callHelpers"


export default {
    name: "Farms",
    components: {
       FarmCard
    },
    data(){
        return {
            amountToDeposit: 100,
            poolInfos: [],
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
        async updatePoolInfo(tokenAddress){
            const poolIndex = this.poolInfos.findIndex((pool => pool.address == tokenAddress))
            const poolInfo = await callPoolAnalytics(this.pools[poolIndex], this.userAddress)
            const extended = Object.assign(this.pools[poolIndex], poolInfo)
            this.poolInfos[poolIndex] = extended
        },

        async depositToken(pid, amount, tokenAddress){
            await deposit(pid, amount)
            await this.updatePoolInfo(tokenAddress)
        },

        async withdrawToken(pid, amount, tokenAddress){
            await withdraw(pid, amount)
            await this.updatePoolInfo(tokenAddress)
        },

        async approveToken(tokenAddress){
            await approveTokenForMasterChef(tokenAddress)
            await this.updatePoolInfo(tokenAddress)
        },

        async buildPoolInfo(){
            this.pools.forEach(async pool => {
                const poolInfo = await callPoolAnalytics(pool, Object.keys(this.user).length > 0 ? this.userAddress : null)
                const extended = Object.assign(pool, poolInfo)
                this.poolInfos.push(extended)
            })
        }
    },
    async created(){
        await this.buildPoolInfo()
    }
}
</script>


<style scoped>

</style>