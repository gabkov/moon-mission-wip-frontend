<template>
    <tr @click="rowOpen=!rowOpen" class="bg-gray-800 hover:bg-zinc-800 text-gray-200" v-bind:class="rowOpen ? 'bg-zinc-800' : ''">
        <td class="px-4 py-5">
            <div class="flex items-center text-sm">
                <div class="w-9 h-9 mr-3 rounded-full">
                    <img src="https://cronosapp.cougarswap.io/images/single-token/WBTC.png" alt="">
                </div>
                <div class="text-sm">{{poolName}}</div>
            </div>
        </td>
        <td class="px-4 py-5">
            <div class="flex flex-col">
                <div class="text-xs">Earned</div>
                <div class="text-md">{{ this.formatNumber(rewards) }}</div>
            </div>
        </td>
        <td class="px-4 py-5">
            <div class="flex flex-col">
                <div class="text-xs">APR</div>
                <div class="text-md">{{poolAPR}}%</div>
            </div>
        </td>
        <td class="px-4 py-5">
            <div class="flex flex-col">
                <div class="text-xs">Liquidity</div>
                <div>${{ this.formatNumber(tvl, 0) }}</div>
            </div>
        </td>
        <td class="px-4 py-5">
            <div class="flex flex-col">
                <div class="text-xs">Multiplier</div>
                <div>{{this.shortenNumber(allocPoint)}}x</div>
            </div>
        </td>
        <td class="px-4 py-5">
            <div class="flex">
                <div class="text-violet-500">Details</div>
                <svg v-if="!rowOpen" class="w-5 h-5 self-end text-violet-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <svg v-else class="w-5 h-5 self-end text-violet-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
            </div>
        </td>
    </tr>
    <tr class="w-full bg-zinc-900 " >
        <td colspan="6" class="" >
            <div class="flex lg:flex-row flex-col-reverse items-center p-8 gap-1" v-bind:class="rowOpen ? 'animate-menu-open origin-top ' : 'animate-menu-close origin-top'">
                <div class="flex lg:self-center self-start flex-col space-y-1 text-violet-500 w-full max-w-[12rem]">
                    <div class="flex flex-row">
                        <a class="text-sm" href="">Get {{poolName}}</a><svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </div>
                    <div class="flex flex-row">
                        <a class="text-sm" href="">View Contract </a><svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </div>
                    <div class="flex flex-row">
                        <a class="text-sm" href="">See pair info </a><svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </div>
                </div>
                <div class="flex items-center justify-between w-full max-w-4xl gap-4">
                    <div class=" p-4 flex flex-col border-2 border-gray-500 rounded-xl w-full">
                        <div class="text-xs" ><span class="text-yellow-300">Fuel</span> Earned</div>
                        <div class="flex items-center justify-between">
                            <div class="text-xl">{{ this.formatNumber(rewards) }}</div>
                            <button class="btn-primary" :disabled="rewards==0" v-bind:class="(rewards == 0)? 'bg-gray-400 opacity-20 hover:bg-gray-400 cursor-not-allowed shadow-none' : '' ">Harvest</button>
                        </div>
                    </div>
                    <div class="p-4 flex place-self-end flex-col border-2 border-gray-500 rounded-xl w-full">
                        <div class="text-xs uppercase">Start Farming</div>
                        <button class="btn-primary">Connect Wallet</button>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
import {formatNumber, getBalanceNumber, shortenNumber, getRawBalanceNumber} from "@/utils/format"
import BigNumber from 'bignumber.js';
import { mapGetters } from "vuex"
import {loginUser} from "@/service/loginService"
import Modal from "../modal/Modal.vue"

export default {
    name: "FarmRow",
    data(){
        return{
            rowOpen: false,
            
        }
    },
    props: {
        pid: Number,
        poolName: String,
        stakedAmount: BigNumber,
        stakedAmountUSD: BigNumber,
        allocPoint: BigNumber,
        tvl: BigNumber,
        poolAPR: String,
        daily: String,
        rewards: BigNumber,
        poolAddress: String,
        userAllowance: BigNumber,
        lpDecimals: Number,
        stakingTokenBalance: Array,
        depositFeeBp: Number
  },
    methods: {
        async login(){
            await loginUser()
        },
        isPoolApproved(allowance) {
            return allowance > 0;
        },
        formatNumber(num, numberOfDecimalValues) {
            return formatNumber(num, numberOfDecimalValues);
        },
        getBalanceNumber(num, decimals) {
            return getBalanceNumber(num, decimals);
        },
        getRawBalanceNumber(num, decimals) {
            return getRawBalanceNumber(num, decimals);
        },
        shortenNumber(num) {
            return shortenNumber(num);
        },
        openModal(methodType){
            this.methodType = methodType
            this.showModal = true
        },
    }
}
</script>