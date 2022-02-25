<template>
<div v-if="isAuthenticatedAndAdmin" class="justify-center flex items-center gap-3">
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
  <div class="flex flex-col gap-1 text-white bg-gray-800 p-6 rounded-2xl">
    <div class="self-center text-3xl">UPDATE POOL</div>
    <div class="flex flex-row gap-2 items-center justify-between">
      <div >Pid</div>
      <input class="text-black" type="number" v-model="pid">
    </div>
    <div class="flex flex-row gap-2 items-center justify-between">
      <div >Allocation Point</div>
      <input class="text-black" type="number" v-model="allocPoint">
    </div>
    
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
    <button @click="updatePool" class="btn-primary">UPDATE POOL</button>
  </div>
</div>
<div v-else class="justify-center flex items-center">
  <div class="text-6xl">NAUGHTY BOY ACCES DENIED :P</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { add, set } from '../service/masterChefService'

const ADMIN = import.meta.env.VITE_ADMIN_ADDRESS

export default {
  name:"Admin",
  data(){
    return {
      pid: 0,
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
      if(this.address === "" || this.depositFeeBP === 0 || this.allocPoint === 0){
        alert("Address is empty or this.depositFeeBP is 0 or allocpoint is 0")
      }

      await add(this.allocPoint, this.address, this.depositFeeBP, this.withUpdate)
    },
    async updatePool(){
      console.log(this.pid, this.allocPoint, this.depositFeeBP, this.withUpdate);
      if(this.depositFeeBP === 0 || this.allocPoint === 0 || this.depositFeeBP < 200){
        alert("DepostiFeeBP is 0 or AllocPoint is 0 or this.depositFeeBP < 200")
      }

      await set(this.pid, this.allocPoint, this.depositFeeBP, this.withUpdate)
    }
  }

}
</script>
