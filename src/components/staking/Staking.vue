<template>
<div class="flex flex-col">
  <ViewSelector
  :tableView="tableView"
  :staked="staked"
  @card-view="setTableView('false')"
  @table-view="setTableView('true')"
  @toggle-staked="toggleStaked"
  />
  <div v-show="!tableView" class="flex flex-wrap justify-center p-6 gap-4">
    <FarmCard
      v-for="pool in this.poolInfos" :key="pool.pid"
      :pool="pool"
      @deposit-token="this.depositToken"
      @withdraw-token="this.withdrawToken"
      @approve-token="this.approveToken"
    />
  </div>
  <div v-show="tableView" class="mt-6 mx-5 sm:mx-10 lg:mx-20">
        <div class="w-full overflow-hidden rounded-xl border-[1.5px] border-gray-400">
          <div class="w-full overflow-x-auto">
            <table class="table-auto w-full">
              <tbody class="divide-y divide-gray-700 bg-gray-800 ">
                <FarmRow
                  v-for="pool in this.poolInfos" :key="pool.pid"
                  :pool="pool"
                  @deposit-token="this.depositToken"
                  @withdraw-token="this.withdrawToken"
                  @approve-token="this.approveToken"
                />
              </tbody>
            </table>
          </div>
        </div>
  </div>
</div>
</template>

<script>
import FarmCard from "../farmcard/FarmCard.vue"
import FarmRow from '../farmcard/FarmRow.vue'
import ViewSelector from '../viewselector/ViewSelector.vue'

export default {
  name: "Staking",
  data(){
    return{
      tableView: localStorage.getItem("tableView") === 'true' || false,
      staked: localStorage.getItem("staked") === 'true' || false
    }
  },
  components: {
    FarmCard,
    FarmRow,
    ViewSelector
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
    },
    setTableView(value){
      localStorage.setItem("tableView", value)
      this.tableView = value === 'true'
    },
    toggleStaked(){
      localStorage.setItem("staked", !this.staked)
      this.staked = !this.staked
    }
  },
  emits: ["deposit-token", "withdraw-token", "approve-token"],
};
</script>

<style scoped></style>
