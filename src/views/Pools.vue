<template>
    <div class="flex flex-col">
        <div class="self-center text-center mt-4 my-2 text-6xl drop-shadow-[0px_0_8px_#171717]">Pools<div class="self-center text-center text-sm">Stake single tokens</div></div>
        <Staking 
            :poolInfos="poolInfos.filter(pool => pool.single)"
            @deposit-token="this.depositToken"
            @withdraw-token="this.withdrawToken"
            @approve-token="this.approveToken"
        />
    </div>
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