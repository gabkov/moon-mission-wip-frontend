<template>
<div v-if="isAuthenticatedAndAdmin" class="justify-center flex items-center">
  <div class="flex flex-col gap-1 text-white bg-gray-800 p-6 rounded-2xl">
    <div class="self-center text-3xl">ADD POOL</div>
    <div class="flex flex-row gap-2 items-center justify-between">
      <div >Allocation Point</div>
      <input class="text-black" type="number" v-model="allocPoint">
    </div>
    <div class="flex flex-row gap-2 items-center justify-between">
      <div >Pool address</div>
      <input class="text-black" type="text" v-model="address"></div>
    <div class="flex flex-row gap-2 items-center justify-between">
      <div >Deposit Fee BP</div>
      <input class="text-black" type="number" v-model="depositFeeBP">
      </div>
    <div class="flex flex-row gap-9 items-center ">
      <div >With Update</div>
      <div >
        <input type="checkbox" :checked="withUpdate">
      </div>
      </div>
    <button @click="addPool" class="btn-primary">ADD POOL</button>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { add } from '../service/masterChefService'

const ADMIN = import.meta.env.VITE_ADMIN_ADDRESS

export default {
  name:"Admin",
  data(){
    return {
      allocPoint: 0,
      address: "",
      depositFeeBP: 400, 
      withUpdate: true
    }
  },
  computed:{
    ...mapGetters({
          user: "getUser",
          userAddress: "getUserAddress",
          pools: "getPools",
      }),
    isAuthenticatedAndAdmin(){
      return Object.keys(this.user).length > 0 && this.userAddress.toLowerCase() === ADMIN.toLowerCase()
    },
  },
  methods:{
    async addPool(){
      console.log(this.allocPoint, this.address, this.depositFeeBP, this.withUpdate);
      if(this.address === ""){
        alert("Address is empty")
        return
      }

      await add(this.allocPoint, this.address, this.depositFeeBP, this.withUpdate)
    }
  }

}
</script>
