<template>
  <div class=" min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-700 text-white">
    <NavBar @toggle-menu="toggleMenu" />
    <Sidebar @toggle-menu="toggleMenu" :menuOpen="this.menuOpen" />
    <div class="h-full ml-14 mt-14 mb-10 md:ml-48">
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
      menuOpen: true,
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
      this.menuOpen = !this.menuOpen
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
    const user = Moralis.User.current()
    if (user) {
      this.setUser(user)
    }
    await this.buildPoolInfo(user)
  },
}
</script>

<style>
  .sidebar:hover {
      width: 12rem
  }
</style>
