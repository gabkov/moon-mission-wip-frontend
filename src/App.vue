<template>
  <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[url('./src/assets/background/bg-space-mobile.jpg')] sm:bg-[url('./src/assets/background/bg-space.jpg')] bg-cover bg-fixed bg-no-repeat text-white ">
    <NavBar @toggle-menu="toggleMenu" :menuOpen="this.menuOpen"/>
    <Sidebar @toggle-menu="toggleMenu" :menuOpen="this.menuOpen" :isMobile="this.isMobile"/>
    <div v-bind:class="menuOpen ? 'md:ml-44' : ''" class="h-full mt-20 mb-10 ml-14">
      <router-view
        :poolInfos="poolInfosSorted"
        :siteBasicInfo="siteBasicInfo"
        :currentBlock="currentBlock"
        :userPreSaleData="userPreSaleData"
        @deposit-token="this.depositToken"
        @withdraw-token="this.withdrawToken"
        @approve-token="this.approveToken"
        @pre-sale-user-info="this.refreshPreSaleUserInfo"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar.vue"
import NavBar from "@/components/navbar/NavBar.vue"
import { callPoolAnalytics, callBasicSiteInfo, callPreSaleUserInfo } from "./utils/callHelpers"
import { mapGetters, mapMutations, useStore } from "vuex"
import { deposit, withdraw } from "./service/masterChefService"
import { approveTokenForMasterChef } from "./service/poolService"
import Moralis from "./plugins/moralis"
import { getJsonRpcProvider } from './service/contracts'
import { getFuelPrice } from './utils/poolAnalytics'


export default {
  name: "App",
  components: {
    Sidebar,
    NavBar,
  },
  data() {
    return {
      poolInfos: [],
      isMobile: false,
      menuOpen:  false,
      siteBasicInfo: {},
      currentBlock: 0,
      userPreSaleData: {}
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      userAddress: "getUserAddress",
      pools: "getPools",
    }),
    poolInfosSorted(){
      return this.poolInfos.sort((a, b) =>  a.order - b.order)
    }
  },
  methods: {
    ...mapMutations({
      setUser: "setUser",
    }),
    toggleMenu() {
      localStorage.setItem("menuOpen", !this.menuOpen)
      this.menuOpen = localStorage.getItem("menuOpen") === 'true'
    },
    async updatePoolInfo(tokenAddress) {
      const poolIndex = this.pools.findIndex((pool) => pool.address == tokenAddress)
      const pool = this.pools[poolIndex]
      const poolInfo = await callPoolAnalytics(pool, this.userAddress)
      const extended = Object.assign(pool, poolInfo)
      const poolInfoIndex = this.poolInfos.findIndex((pool) => pool.tokenAddress == tokenAddress)
      this.poolInfos.splice(poolInfoIndex, 1, extended)
    },

    async depositToken(pid, amount, tokenAddress) {
      await deposit(pid, amount)
      await this.updatePoolInfo(tokenAddress)
    },

    async withdrawToken(pid, amount, tokenAddress) {
      await withdraw(pid, amount)
      await this.updatePoolInfo(tokenAddress)
    },

    async approveToken(tokenAddress) {
      await approveTokenForMasterChef(tokenAddress)
      await this.updatePoolInfo(tokenAddress)
    },    
    
    async getCurrentBlock(){
      return await getJsonRpcProvider().getBlockNumber()
    },

    async buildBasicSiteInfo(){
      this.currentBlock = await this.getCurrentBlock()
      this.siteBasicInfo = await callBasicSiteInfo()
    },

    async buildPoolInfo(user) {
      this.pools.forEach(async (pool) => {
        const poolInfo = await callPoolAnalytics(pool, user ? this.userAddress : null)
        const extended = Object.assign(pool, poolInfo)
        this.poolInfos.push(extended)
      })
    },
    async refreshPreSaleUserInfo(){
      this.userPreSaleData = await callPreSaleUserInfo(this.userAddress)
    }
  },
  async created() {
    this.buildBasicSiteInfo()
    const store = useStore()
    store.dispatch("setFuelPriceAsync", await getFuelPrice())
    if (screen.width <= 640) {
      this.isMobile = true
    }
    this.menuOpen = localStorage.getItem("menuOpen") !== null ? localStorage.getItem("menuOpen") === 'true' : !this.isMobile
    const user = Moralis.User.current()
    if (user) {
      this.setUser(user)
      this.refreshPreSaleUserInfo()
    } else {
      await this.buildPoolInfo(user)
    }
  },
  watch: {
    async user(){
      this.poolInfos.splice(0)
      await this.buildPoolInfo(this.user)
      this.refreshPreSaleUserInfo()
    }
  }
}
</script>

<style>
  .sidebar:hover {
      width: 12rem
  }
</style>
