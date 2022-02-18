<template>
  <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[url('./src/assets/background/bg-space.jpg')] bg-fixed bg-no-repeat bg-cover text-white ">
    <NavBar @toggle-menu="toggleMenu" :menuOpen="this.menuOpen"/>
    <Sidebar @toggle-menu="toggleMenu" :menuOpen="this.menuOpen" :isMobile="this.isMobile"/>
    <div v-bind:class="menuOpen ? 'md:ml-44' : ''" class="h-full mt-20 mb-10 ml-14">
      <router-view
        :poolInfos="poolInfos"
        @deposit-token="this.depositToken"
        @withdraw-token="this.withdrawToken"
        @approve-token="this.approveToken"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar.vue"
import NavBar from "@/components/navbar/NavBar.vue"
import { callPoolAnalytics } from "./utils/callHelpers"
import { mapGetters, mapMutations } from "vuex"
import { deposit, withdraw } from "./service/masterChefService"
import { approveTokenForMasterChef } from "./service/poolService"
import Moralis from "./plugins/moralis"

export default {
  name: "App",
  components: {
    Sidebar,
    NavBar,
  },
  data() {
    return {
      poolInfos: [],
      menuOpen:  localStorage.getItem("menuOpen") !== null ? localStorage.getItem("menuOpen") === 'true' : true,
      isMobile: false
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      userAddress: "getUserAddress",
      pools: "getPools",
    }),
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
      const poolIndex = this.poolInfos.findIndex((pool) => pool.address == tokenAddress)
      const poolInfo = await callPoolAnalytics(this.pools[poolIndex],this.userAddress)
      const extended = Object.assign(this.pools[poolIndex], poolInfo)
      this.poolInfos[poolIndex] = extended
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

    async buildPoolInfo(user) {
      this.pools.forEach(async (pool) => {
        const poolInfo = await callPoolAnalytics(pool, user ? this.userAddress : null)
        const extended = Object.assign(pool, poolInfo)
        this.poolInfos.push(extended)
      })
    },
  },
  async created() {
    if (screen.width <= 640) {
      this.isMobile = true
    } 
    const user = Moralis.User.current()
    if (user) {
      this.setUser(user)
    } else {
      await this.buildPoolInfo(user)
    }
  },
  watch: {
    async user(){
      this.poolInfos.splice(0)
      await this.buildPoolInfo(this.user)
    }
  }
}
</script>

<style>
  .sidebar:hover {
      width: 12rem
  }
</style>
