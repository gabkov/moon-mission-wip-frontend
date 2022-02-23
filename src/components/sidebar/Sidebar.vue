<template>
  <div v-bind:class="menuOpen? 'w-44':'w-14'" class="opacity-[0.96] fixed flex flex-col top-14 left-0 bg-gradient-to-r from-gray-900 to-gray-800 h-full rounded-r-xl text-white transition-all duration-300 border-r-4 border-t-[3px] shadow-xl shadow-sky-500  border-gray-600 z-[1]">
    <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
      <ul class="flex flex-col py-4 space-y-3.5">

        <SidebarLink @click="toggleMenuIfMobile()" to="/" menuOption="Home" :external="false"/>
        <SidebarLink @click="toggleMenuIfMobile()" to="/pre-sale" menuOption="Pre-sale" :external="false"/>
        <SidebarLink @click="toggleMenuIfMobile()" to="/farms" menuOption="Farms" :external="false"/>
        <SidebarLink @click="toggleMenuIfMobile()" to="/pools" menuOption="Pools" :external="false"/>
        <SidebarLink @click="toggleMenuIfMobile()" to="https://dex.guru/token/0x8a953cfe442c5e8855cc6c61b1293fa648bae472-polygon" menuOption="Chart" :external="true"/>
        <SidebarLink @click="toggleMenuIfMobile()" to="" menuOption="Docs" :external="true"/>
      </ul>
      <div class="flex flex-row justify-center items-center mb-16 gap-1">
          <img  class="w-12 h-12" src="@/assets/tokens/fuel_icon.png" alt="fuel">
        <div v-show="menuOpen" class="text-center text-base self-center">${{formatNumber(fuelPrice, 2)}}</div>
      </div>
    </div>
  </div>


</template>

<script>
import BigNumber from 'bignumber.js'
import SidebarLink from './SidebarLink.vue'
import { formatNumber } from '../../utils/format'

export default {
  props: {
    menuOpen: Boolean,
    isMobile: Boolean,
    fuelPrice: BigNumber
  },
  components: { SidebarLink },
  methods: {
    formatNumber,
    toggleMenuIfMobile(){
      if(this.isMobile && this.menuOpen){
        this.$emit('toggle-menu')
      }
    }
  }
}
</script>