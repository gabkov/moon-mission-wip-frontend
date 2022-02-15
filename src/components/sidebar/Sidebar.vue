<template>
  <div class="opacity-95 fixed flex flex-col top-14 left-0 w-14 hover:w-48 md:w-48 bg-gradient-to-r from-gray-900 to-gray-800 h-full text-white transition-all duration-300 border-r-2 shadow-xl shadow-sky-500 sm:shadow-2xl sm:shadow-sky-500 border-gray-600 z-10 ">
    <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
      <ul class="flex flex-col py-4 space-y-2">

        <SidebarLink to="/" menuOption="Home"/>
        <SidebarLink to="/pre-sale" menuOption="Pre-sale"/>
        <SidebarLink to="/farms" menuOption="Farms"/>

      </ul>
      <p class="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2021</p>
    </div>
  </div>


</template>

<script>
import SidebarLink from './SidebarLink.vue'

export default {
  props: {
    menuOpen: Boolean
  },
  components: { SidebarLink },
}
</script>

<style>

</style>

<style scoped>

</style>