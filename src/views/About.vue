<template>
<div class="bg-black justify-center h-screen flex items-center">
  <div class="flex bg-gradient-to-b from-sky-500 via-sky-400 to-sky-600 fill-white rounded-full border-[20px] border-white justify-center w-fit">
    <Fuel class="w-[600px] h-[600px] mt-[7.5rem] mb-[7.5rem] ml-[9.5rem] mr-[5.5rem]"/>
  </div>
</div>
</template>

<script>
import Fuel from '../components/fuel/Fuel.vue'
export default {
  name:"About",

  components:{
    Fuel
  }
}
</script>
