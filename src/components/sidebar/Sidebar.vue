<template>
  <div v-bind:class="menuOpen? 'w-44':'w-14'" class="opacity-[0.96] fixed flex flex-col top-14 left-0 bg-gradient-to-r from-gray-900 to-gray-800 h-full rounded-r-xl text-white transition-all duration-300 border-r-4 border-t-[3px] shadow-xl shadow-sky-500  border-gray-600 z-[1]">
    <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
      <ul class="flex flex-col py-4 space-y-3">

        <SidebarLink @click="toggleMenuIfMobile()" to="/" menuOption="Home"/>
        <SidebarLink @click="toggleMenuIfMobile()" to="/pre-sale" menuOption="Pre-sale"/>
        <SidebarLink @click="toggleMenuIfMobile()" to="/farms" menuOption="Farms"/>

      </ul>
      <p v-show="menuOpen" class="mb-14 px-5 py-3 text-center text-xs">Copyright @2021</p>
    </div>
  </div>


</template>

<script>
import SidebarLink from './SidebarLink.vue'

export default {
  props: {
    menuOpen: Boolean,
    isMobile: Boolean
  },
  components: { SidebarLink },
  methods: {
    toggleMenuIfMobile(){
      if(this.isMobile && this.menuOpen){
        this.$emit('toggle-menu')
      }
    }
  }
}
</script>

<style>

</style>

<style scoped>

</style>