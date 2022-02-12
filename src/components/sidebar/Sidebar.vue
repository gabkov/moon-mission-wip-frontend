<template>
  <div class="fixed flex flex-col top-14 left-0 w-14 hover:w-48 md:w-48 bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
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