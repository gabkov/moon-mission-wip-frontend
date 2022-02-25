<template>
    <Modal
    :showModal="showModal"
    :poolName="poolName"
    :stakingTokenBalance="stakingTokenBalance"
    :stakedAmount="stakedAmount"
    :pid="pid"
    :poolAddress="poolAddress"
    :methodType="methodType"
    @close-modal="showModal=false"
    @deposit-token="this.depositToken"
    @withdraw-token="this.withdrawToken"
    />
    <tr v-show="!staked ||staked && stakedAmount > 0" @click="rowOpen=!rowOpen" class="flex flex-wrap justify-evenly items-center sm:table-row bg-gray-800 hover:bg-zinc-800 text-gray-200" v-bind:class="rowOpen ? 'bg-zinc-800' : ''">
        <td class="px-4 py-5">
            <div class="flex items-center text-sm">
                <div class="w-9 h-9 mr-3 rounded-full">
                    <img v-if="single" class="w-16" :src="'/tokens/' + logo1 + '.png'" :alt="logo1">
                    <div v-else class="relative">
                        <img class="w-8 h-8 absolute top-0 -left-1 " :src="'/tokens/' + logo2 + '.png'" :alt="logo2">
                        <img class="w-8 h-8 absolute top-3 left-2" :src="'/tokens/' + logo1 + '.png'" :alt="logo1">
                    </div>
                </div>
                <div class="text-sm">{{poolName}}</div>
            </div>
        </td>
        <td class="px-4 py-5">
            <div class="flex flex-col">
                <div class="text-xs">Earned</div>
                <div class="text-md">{{formatNumber(rewards) }}</div>
            </div>
        </td>
        <td class="hidden lg:table-cell lg:px-4 lg:py-5">
            <div class="flex flex-col">
                <div class="text-xs">APR</div>
                <div class="text-md">{{poolAPR}}%</div>
            </div>
        </td>
        <td class="hidden lg:table-cell lg:px-4 lg:py-5">
            <div class="flex flex-col">
                <div class="text-xs">Daily APR</div>
                <div class="text-md">{{daily}}%</div>
            </div>
        </td>
        <td class="hidden lg:table-cell lg:px-4 lg:py-5">
            <div class="flex flex-col">
                <div class="text-xs">Liquidity</div>
                <div class="whitespace-nowrap">${{ formatNumber(tvl, 0) }}</div>
            </div>
        </td>
        <td class="px-4 py-5">
            <div class="flex flex-col">
                <div class="text-xs">Multiplier</div>
                <div class="text-center bg-violet-600 rounded-full self-start px-1">{{shortenNumber(allocPoint)}}x</div>
            </div>
        </td>
        <td class="px-4 py-5">
            <div class="flex flex-col">
                <div class="text-xs">Fee</div>
                <div class="text-md" :class="poolName === 'BUSD-PDOGE' || poolName === 'PDOGE' ? 'text-red-500' : ''">{{poolName === 'BUSD-PDOGE' || poolName === 'PDOGE' ? '🔥':''}}{{depositFeeBp / 100}}%</div>
            </div>
        </td>
        <td class="px-4 py-5">
            <div class="flex text-violet-500">
                <div class="">Details</div>
                <svg v-if="!rowOpen" class="w-5 h-5 self-end " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <svg v-else class="w-5 h-5 self-end " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
            </div>
        </td>
    </tr>
    <tr v-show="!staked ||staked && stakedAmount > 0" class="w-full bg-zinc-900 max-h-0" >
        <td colspan="8" class="max-h-0" >
            <div class="flex lg:flex-row flex-col-reverse items-center gap-1 p-4 sm:p-8" v-show="rowOpen">
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
                <div class="flex flex-row w-full justify-between lg:hidden mb-2">
                    <div class="text-md">Liquidity</div>
                    <div class="whitespace-nowrap">${{ formatNumber(tvl, 0) }}</div>
                </div>
                <div class="flex flex-row w-full justify-between lg:hidden">
                    <div class="text-md">Daily APR</div>
                    <div class="text-md">{{daily}}%</div>
                </div>
                <div class="flex flex-row w-full justify-between lg:hidden mt-2">
                    <div class="text-md">APR</div>
                    <div class="text-md">{{poolAPR}}%</div>
                </div>
                <div class="flex md:flex-row flex-col items-center justify-between w-full gap-4">
                    <div class="p-4 flex flex-col border-2 border-gray-500 rounded-2xl w-full">
                        <div class="text-xs uppercase" ><span class="text-yellow-300 ">Fuel</span> Earned</div>
                        <div class="flex items-center justify-between gap-2">
                            <div class="text-xl">{{ formatNumber(rewards) }}</div>
                            <button class="btn-primary" @click="$emit('withdraw-token', pid, 0, poolAddress)" :disabled="rewards==0" v-bind:class="(rewards == 0)? 'bg-gray-400 opacity-20 hover:bg-gray-400 cursor-not-allowed shadow-none' : '' ">Harvest</button>
                        </div>
                    </div>
                    <div class="p-4 flex place-self-end flex-col border-2 border-gray-500 rounded-2xl w-full"> 
                        <div v-if="isAuthenticated">
                            <div class="text-xs uppercase"><span class="text-violet-500">{{ poolName }}</span> staked</div>
                            <div v-if="isPoolApproved(userAllowance)" class="flex items-center justify-between gap-2">
                                <div class="pt-1">
                                    <div class="text-xl" >{{ formatNumber(getBalanceNumber(stakedAmount, lpDecimals)) }}</div>
                                    <div class="text-[10px] text-gray-500" >~{{ formatNumber(stakedAmountUSD) }} USD</div>
                                </div>
                                <div v-if="this.getBalanceNumber(stakedAmount, lpDecimals) > 0" class="flex ">
                                    <button @click="openModal('withdraw-token')"
                                    class="inline-flex items-center justify-center p-0.5 mr-1 overflow-hidden text-sm font-extrabold rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 text-white focus:ring-1 focus:ring-cyan-800">
                                    <span class="px-3.5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">－</span>
                                    </button>
                                    <button @click="openModal('deposit-token')" 
                                            class="inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-extrabold rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 text-white focus:ring-1 focus:ring-cyan-800">
                                    <span class="px-3.5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">＋</span>
                                    </button>
                                </div>
                                <div v-else>
                                    <button class="btn-primary" @click="openModal('deposit-token')">Stake</button>
                                </div>
                            </div>
                            <div v-else class="pt-3">
                            <button class="w-full btn-primary" @click="$emit('approve-token', poolAddress)" >Approve {{poolName}}</button>
                            </div>
                        </div>
                        <div v-else class="">
                            <div class="text-xs uppercase">Start Farming</div>
                            <button v-if="!userLoading" class="w-full btn-primary" @click="loginUser()" >Connect Wallet</button>
                            <div v-else class="pt-4 flex justify-center items-center" >
                                <svg role="status" class="mr-2 w-9 h-9 animate-spin text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="text-sm">Signing...</span>
                            </div>
                        </div>
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
    components:{
        Modal
    },
    data(){
        return{
            rowOpen: false,
            showModal: false,
            methodType: ""
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
        depositFeeBp: Number,
        single: Boolean,
        logo1: String,
        logo2: String,
        staked: Boolean

    },
    computed: {
        ...mapGetters({
            user: "getUser",
            userLoading: "getUserLoading",
        }),
        isAuthenticated(){
            return Object.keys(this.user).length > 0
        }
    },
    methods: {
        loginUser,
        formatNumber, 
        getBalanceNumber, 
        getRawBalanceNumber,
        shortenNumber,
        isPoolApproved(allowance) {
            return allowance > 0;
        },
        openModal(methodType){
            this.methodType = methodType
            this.showModal = true
        },
        async depositToken(pid, amount, tokenAddress) {
            this.$emit("deposit-token", pid, amount, tokenAddress);
        },

        async withdrawToken(pid, amount, tokenAddress) {
            this.$emit("withdraw-token", pid, amount, tokenAddress);
        },
    },
    emits: ["deposit-token", "withdraw-token", "approve-token"],
}
</script>