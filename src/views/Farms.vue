<template>
  <div v-show="!tableView" class="flex flex-wrap justify-center p-6 gap-4">
    <FarmCard
      v-for="pool in this.poolInfos" :key="pool.pid"
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
      :depositFeeBp="pool.depositFeeBp"
      @deposit-token="this.depositToken"
      @withdraw-token="this.withdrawToken"
      @approve-token="this.approveToken"
    />
  </div>
<div v-show="tableView" class="mt-4 mx-20">
      <div class="w-full overflow-hidden rounded-lg shadow-md">
        <div class="w-full overflow-x-auto">
          <table class="table-auto w-full">
            <tbody class="divide-y divide-gray-700 bg-gray-800">
              <FarmRow
                v-for="pool in this.poolInfos" :key="pool.pid"
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
                :depositFeeBp="pool.depositFeeBp"
                @deposit-token="this.depositToken"
                @withdraw-token="this.withdrawToken"
                @approve-token="this.approveToken"
              />
            </tbody>
          </table>
        </div>
      </div>
</div>
</template>

<script>
import FarmCard from "../components/farmcard/FarmCard.vue";
import FarmRow from '../components/farmcard/FarmRow.vue';

export default {
  name: "Farms",
  data(){
    return{
      tableView: true
    }
  },
  components: {
    FarmCard,
    FarmRow
  },
  props: {
    poolInfos: Object,
  },
  methods: {
    async depositToken(pid, amount, tokenAddress) {
      this.$emit("deposit-token", pid, amount, tokenAddress);
    },

    async withdrawToken(pid, amount, tokenAddress) {
      this.$emit("withdraw-token", pid, amount, tokenAddress);
    },

    async approveToken(tokenAddress) {
      this.$emit("approve-token", tokenAddress);
    },
  },
  emits: ["deposit-token", "withdraw-token", "approve-token"],
};
</script>

<style scoped></style>
