<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
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
