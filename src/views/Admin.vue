<template>
<div v-if="isAuthenticatedAndAdmin" class="justify-center flex flex-col items-center gap-10 mt-10">
  <div class="flex flex-row gap-2 w-full justify-center">
    <div class="flex flex-col gap-1 text-white bg-gray-800 p-6 rounded-2xl border-2 border-white w-full max-w-2xl">
        <div class="self-center text-3xl">SINGLE POOLS</div>
        <table class="table-fixed">
          <thead class="text-left bg-gray-500">
            <tr>
              <th>Name</th>
              <th>Pid</th>
              <th>Daily apr</th>
              <th>Alloc point</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700" @click="e => e.target.classList.toggle('bg-violet-400')">
            <tr v-show="pool.single" v-for="pool in this.poolInfos" :key="pool.pid" class="even:bg-gray-700">
              <td>{{pool.name}}</td>
              <td>{{pool.pid}}</td>
              <td>{{pool.daily}}%</td>
              <td>{{pool.allocPoint}}</td>
              <td>{{pool.depositFeeBp}}</td>
            </tr>
          </tbody>
        </table>
    </div>
    <div class="flex flex-col gap-1 text-white bg-gray-800 p-6 rounded-2xl border-2 border-white w-full max-w-2xl">
        <div class="self-center text-3xl">LPs</div>
        <table class="table-fixed">
          <thead class="text-left bg-gray-500">
            <tr>
              <th>Name</th>
              <th>Pid</th>
              <th>Daily apr</th>
              <th>Alloc point</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700" @click="e => e.target.classList.toggle('bg-violet-400')">
            <tr v-show="!pool.single" v-for="pool in this.poolInfos" :key="pool.pid" class="odd:bg-gray-700">
              <td>{{pool.name}}</td>
              <td>{{pool.pid}}</td>
              <td>{{pool.daily}}%</td>
              <td>{{pool.allocPoint}}</td>
              <td>{{pool.depositFeeBp}}</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
  <div class="flex flex-row gap-6 ">
    <div class="flex flex-col gap-1 text-white bg-gray-800 p-6 rounded-2xl border-2 border-white">
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
    <div class="flex flex-col gap-1 text-white bg-gray-800 p-6 rounded-2xl border-2 border-white">
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
  <div class="text-4xl">ADD MAIN POOLS</div>
  <div class="flex flex-row justify-center gap-2">
    <div class="flex flex-col gap-2 bg-gray-800 p-6 rounded-2xl border-2 border-white">
      <button class="btn-primary max-w-md" @click="addFUEL">ADD FUEL</button>
      <button class="btn-primary max-w-md" @click="addPDOGE">ADD PDOGE</button>
      <button class="btn-primary max-w-md" @click="addBUSD">ADD BUSD</button>
      <button class="btn-primary max-w-md" @click="addWBNB">ADD WBNB</button>
      <button class="btn-primary max-w-md" @click="addBTCB">ADD BTCB</button>
      <button class="btn-primary max-w-md" @click="addETH"> ADD ETH</button>
      <button class="btn-primary max-w-md" @click="addCAKE">ADD CAKE </button>
    </div>
    <div class="flex flex-col gap-2 bg-gray-800 p-6 rounded-2xl border-2 border-white">
      <button class="btn-primary max-w-md" @click="addFUEL_BUSD">ADD FUEL_BUSD </button>
      <button class="btn-primary max-w-md" @click="addFUEL_WBNB">ADD FUEL_WBNB</button>
      <button class="btn-primary max-w-md" @click="addBUSD_PDOGE">ADD BUSD_PDOGE</button>
      <button class="btn-primary max-w-md" @click="addBUSD_WBNB">ADD BUSD_WBNB</button>
      <button class="btn-primary max-w-md" @click="addBUSD_USDT">ADD BUSD_USDT</button>
      <button class="btn-primary max-w-md" @click="addBUSD_USDC">ADD BUSD_USDC</button>
      <button class="btn-primary max-w-md" @click="addBTCB_ETH">ADD BTCB_ETH</button>
    </div>
  </div>
  <div>
    <button @click="transferFuelOwnership" class="btn-primary w-full">Transfer Fuel OwnerShip to MasterChef</button>
  </div>
</div>
<div v-else class="justify-center flex items-center">
  <div class="text-6xl">NAUGHTY BOY ACCES DENIED :P</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { add, set } from '../service/masterChefService'
import { poolAddresses, CONSTANTS } from '../consts/constants'
import { fuelContractOwnable } from '../service/contracts'


const ADMIN = import.meta.env.VITE_ADMIN_ADDRESS
const  PA = poolAddresses[import.meta.env.VITE_APP_CHAIN_ID]
const MASTERCHEF =  CONSTANTS[import.meta.env.VITE_APP_CHAIN_ID].MASTERCHEF


export default {
  name:"Admin",
  data(){
    return {
      pid: 0,
      allocPoint: 0,
      address: "",
      depositFeeBP: 400, 
      withUpdate: true,
    }
  },
  props: {
      poolInfos: Array,
    },
  computed:{
    ...mapGetters({
          user: "getUser",
          userAddress: "getUserAddress",
      }),
    isAuthenticatedAndAdmin(){
      return Object.keys(this.user).length > 0 && this.userAddress.toLowerCase() === ADMIN.toLowerCase()
    },
  },
  methods:{
    async transferFuelOwnership(){
        await fuelContractOwnable().transferOwnership(MASTERCHEF)
    },
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
    },
    async addFUEL(){
      await add(1000,  PA.FUEL, 0, true) // 0
    },
    async addPDOGE(){
      await add(500,  PA.PDOGE, 300, true) // 1
    },
    async addBUSD(){
      await add(500,  PA.BUSD, 400, true) // 2
    },
    async addWBNB(){
      await add(500,  PA.WBNB, 400, true) // 3
    },
    async addBTCB(){
      await add(700,  PA.BTCB, 400, true) // 4
    },
    async addETH(){
      await add(600,  PA.ETH, 400, true) // 5
    },
    async addCAKE(){
      await add(500,  PA.CAKE, 400, true) // 6
    },
    async addFUEL_BUSD(){
      await add(1000,  PA.FUEL_BUSD, 0, true) // 7
    },
    async addFUEL_WBNB(){
      await add(1000,  PA.FUEL_WBNB, 0, true) // 8
    },
    async addBUSD_PDOGE(){
      await add(1000,  PA.BUSD_PDOGE, 200, true) // 9
    },
    async addBUSD_WBNB(){
      await add(1000,  PA.BUSD_WBNB, 400, true) //10
    },
    async addBUSD_USDT(){
      await add(1000,  PA.BUSD_USDT, 400, true) // 11
    },
    async addBUSD_USDC(){
      await add(1000,  PA.BUSD_USDC, 400, true) // 12
    },
    async addBTCB_ETH(){
      await add(1000,  PA.BTCB_ETH, 400, true) // 13
    },
  }

}
</script>
