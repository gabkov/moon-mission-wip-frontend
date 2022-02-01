<template>
  <div >
      <div v-for="(item, index) in poolInfos" :key="item.pid" >
          <div>LP TOKEN: {{item.lpToken}}</div>
          <div>ALLOCATION: {{item.allocPoint}}</div>
          <div>LAST REWARD BLOCK: {{item.lastRewardBlock}}</div>
          <div>ACC FUEL PER SHARE: {{item.accFuelPerShare}}</div>
          <div>LP SUPPLY: {{item.lpSupply}}</div>
          <div>DEPOSIT FEE: {{item.depositFeeBP}}</div>
          <div></div>
          <input v-if="item.isApproved" type="number" v-model.number="amountToDeposit">
          <button v-if="item.isApproved" @click="depositToken(index, amountToDeposit)">DEPOSIT</button>
          <button v-else @click="approveToken(item.lpToken)" >APPROVE {{POOLS.testnet[index].name}}</button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {deposit, getPoolInfo, poolLength} from "../service/masterChefService"
import {isApprovedMasterChef, approveTokenForMasterChef} from "../service/poolService"
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
        async depositToken(pid, amount){
            await deposit(pid, amount)
        },
        async approveToken(tokenAddress){
            const receipt = await approveTokenForMasterChef(tokenAddress)
            const sender = receipt.events[0].args[0]
            if (sender.toLowerCase() === this.userAddress){
                const poolIndex = this.poolInfos.findIndex((pool => pool.lpToken == tokenAddress));
                this.poolInfos[poolIndex].isApproved = true
                console.log("fingás");
            }  
        },
        async buildPoolInfo(){
            for (let index = 0; index < await poolLength(); index++) {
                const poolInfo = await getPoolInfo(index)
                const extended = Object.assign({isApproved: await isApprovedMasterChef(poolInfo.lpToken)}, poolInfo)
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