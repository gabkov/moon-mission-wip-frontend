<template>
  <h2>FARMS</h2>
  <div class="row row-cols-1 row-cols-sm-3 g-3 justify-content-center">
    <div class="col" v-for="pool in this.poolInfos" :key="pool.pid">
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
import FarmCard from "../components/farmcard/FarmCard.vue";

export default {
  name: "Farms",
  components: {
    FarmCard,
  },
  props: {
    poolInfos: Object,
  },
  methods: {
    async depositToken(pid, amount, tokenAddress) {
      this.$emit('deposit-token', pid, amount, tokenAddress)
    },

    async withdrawToken(pid, amount, tokenAddress) {
      this.$emit('withdraw-token', pid, amount, tokenAddress)
    },

    async approveToken(tokenAddress) {
      this.$emit('approve-token', tokenAddress)
    },
  },
  emits: ["deposit-token", "withdraw-token", "approve-token"],
};
</script>

<style scoped></style>
