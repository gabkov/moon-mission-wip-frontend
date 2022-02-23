<template>
    <Staking 
        :poolInfos="poolInfos.filter(pool => !pool.single)"
        @deposit-token="this.depositToken"
        @withdraw-token="this.withdrawToken"
        @approve-token="this.approveToken"
    />
</template>

<script>
import Staking from '../components/staking/Staking.vue'

export default {
    name: "Pools",
    components: {
        Staking
    },
    props: {
        poolInfos: Array,
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
        }
    },
    emits: ["deposit-token", "withdraw-token", "approve-token"],
}

</script>