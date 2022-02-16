<template>
<div v-show="showModal" class="fixed top-0 left-0 w-full h-full z-10 ">
    <div class="w-full h-full bg-gray-600 top-0 left-0 opacity-40 absolute"></div>
    
    <div class="w-11/12 max-w-md flex flex-col gap-2 -translate-y-1/2 p-6 bg-black rounded-3xl top-1/2 left-1/2 -translate-x-1/2 absolute">
        <div class="pb-8 flex items-center justify-between"> 
            <div class="text-xl font-medium">{{methodType === depositToken ? "Stake " : "Unstake "}} {{poolName}}</div>
            <div class="cursor-pointer" @click="closeModal(); amount=0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
        </div>
        <div class="bg-gray-500 rounded-xl p-2 mb-6 space-y-2">
            <div>
                <div class="flex items-center justify-between">
                    <div>{{methodType === depositToken ? "Stake " : "Unstake "}}</div>
                    <div>Balance: {{methodType === depositToken ? this.formatNumber(getRawBalanceNumber(stakingTokenBalance), 3) : this.formatNumber(getRawBalanceNumber(stakedAmount), 3)}}</div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <input class=" w-full mr-2 bg-gray-600 rounded-xl border-2 border-gray-800"  type="text" v-model.number="amount">
                <button class="btn-primary rounded-full text-sm" @click="setMaxBalance()">MAX</button>
            </div>
        </div>
        <div class="flex items-center justify-evenly mb-6">
            <button @click="closeModal(); amount=0" class="btn-primary w-full" >Cancel</button>
            <button @click="$emit(methodType, pid, amount, poolAddress)" class="btn-primary w-full" v-bind:class="(amount == 0)? 'bg-gray-400 opacity-20 hover:bg-gray-400 cursor-not-allowed' : '' ">Confirm</button>
        </div>
    </div>
</div>
</template>

<script>
import {formatNumber, getRawBalanceNumber} from "@/utils/format"
import BigNumber from 'bignumber.js'

export default {
    name: "Modal",
    data(){
        return{
            depositToken: "deposit-token",
            withdrawToken: "withdraw-token",
            amount: 0
        }
    },
    props:{
        showModal: Boolean,
        poolName: String,
        stakingTokenBalance: Array,
        stakedAmount: BigNumber,
        pid: Number,
        poolAddress: String,
        methodType: String
    },
    methods:{
        setMaxBalance(){
            this.amount = (this.methodType === this.depositToken) ? getRawBalanceNumber(this.stakingTokenBalance) : getRawBalanceNumber(this.stakedAmount)
        },
        formatNumber(num, numberOfDecimalValues) {
            return formatNumber(num, numberOfDecimalValues);
        },

        getRawBalanceNumber(num, decimals) {
            return getRawBalanceNumber(num, decimals);
        },
        closeModal(){
            this.$emit("close-modal")
        }
    },
    watch: {
        stakingTokenBalance: {
            handler(){
                if(this.amount > 0){ // only close the modal if value was submited
                    this.closeModal()
                    this.amount = 0
                }
            }
        },
        stakedAmount: {
            handler(){
                if(this.amount > 0){
                    this.closeModal()
                    this.amount = 0
                }
            }
        }
    }
}
</script>