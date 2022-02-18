<template>
  <div class="flex flex-wrap justify-center gap-6 p-4 sm:p-8">
    <div class="opacity-[0.98] flex  flex-col w-full max-w-sm bg-gray-800 drop-shadow-[0px_0_3px_#9ca3af] rounded-3xl p-5 border-2 border-gray-400 text-white font-medium gap-6">
      <div class="text-3xl self-center">Farms & Staking</div>
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div class="flex justify-center items-center w-full gap-2">
          <img class="w-14 h-14" src="https://polywantsacracker.farm/images/coins/quick.png" alt="fuel">
          <div class="items-center">
            <button @click="addFuelToMetamask()" class="btn-primary pt-[0.15rem] pb-[0.15rem] bg-gray-800 hover:bg-sky-500 flex flex-row items-center w-full gap-2"><span class="self-center">+</span><img class="w-5 h-5 self-center" src="../assets/metamask.png" alt="metamask"></button>
          </div>
        </div>
        <a class="w-full" href=""><button class="btn-primary sm:pt-1 sm:pb-1 w-full">Buy FUEL</button></a>
      </div>
      <div class="flex flex-col justify-between gap-1">
        <div class="text-2xl">FUEL to harvest</div>
        <div class="text-lg">LOCKED</div>
        <div class="text-sm">~$0.00</div>
      </div>
      <div class="flex flex-col justify-between gap-1">
        <div class="text-2xl">FUEL in wallet</div>
        <div class="text-lg">LOCKED</div>
        <div class="text-sm">~$0.00</div>
      </div>
    </div>

    <div class="opacity-[0.98] flex flex-col w-full max-w-sm bg-gray-800 drop-shadow-[0px_0_3px_#9ca3af] rounded-3xl p-5 border-2 border-gray-400 text-white font-medium gap-1">
      <div class="text-3xl self-center mb-4">Announcements</div>
      <a class="twitter-timeline" data-width="500" data-height="300" data-theme="light" :key="twitterUrl" :href="twitterUrl" >Tweets by digi_future2018</a>
    </div>

    <div class="opacity-[0.98] flex flex-col w-full max-w-sm bg-gray-800 drop-shadow-[0px_0_3px_#9ca3af] rounded-3xl p-5 border-2 border-gray-400 text-white font-medium divide-y divide-gray-300/50">
      <div class="flex flex-col gap-2">
        <div class="text-3xl self-center">FUEL stats</div>
        <div class="flex flex-row justify-between">
          <div>Market Cap</div>
          <div class="font-bold">$1 000 109</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>Total Minted</div>
          <div class="font-bold">70 000</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>Circulating Supply</div>
          <div class="font-bold">321</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>Max Supply</div>
          <div class="font-bold">100 000</div>
        </div>
        <div class="flex flex-row justify-between">
          <div>Total FUEL burned</div>
          <div class="font-bold">10 000</div>
        </div>
        <div class="mb-5 flex flex-row justify-between">
          <div>New FUEL/block</div>
          <div class="font-bold">0.1</div>
        </div>
      </div>
      <div>
      <div class="text-xl mt-5 flex flex-row justify-between">
        <div>Initial Liquidity</div>
        <div class="font-bold">$150 000</div>
      </div>
      </div>
    </div>


    <div class="opacity-[0.98] flex flex-col lg:flex-row w-full max-w-sm lg:max-w-3xl  text-white font-medium gap-6">
      <div class="opacity-[0.98] flex flex-col w-full bg-gray-800 drop-shadow-[0px_0_3px_#9ca3af] rounded-3xl p-5 border-2 border-gray-400 gap-2">
        <div class="text-xl sm:text-2xl ">Total Value Locked (TVL)</div>
        <div class="text-3xl font-bold">$321321433</div>
        <div class="text-sm">Across all Farms and Pools</div>
      </div>
      <div class="opacity-[0.98] flex flex-col w-full bg-gray-800 drop-shadow-[0px_0_3px_#9ca3af] rounded-3xl p-5 border-2 border-gray-400  gap-2">
        <div class="text-xl sm:text-2xl ">Total Native Liquidity (TNL)</div>
        <div class="text-3xl font-bold">$3213243413</div>
        <div class="text-sm">Across all Native LPs</div>
      </div>
    </div>
  </div>
 
</template>

<script>
import { CONSTANTS } from '../consts/constants'
import store from '../store'

const constants = CONSTANTS[store.state.chainId] 

export default {
  name: "Home",
  data(){
    return{
      twitterUrl: 'https://twitter.com/digi_future2018?ref_src=twsrc%5Etfw'
    }
  },
  methods:{
    addFuelToMetamask(){
      window.ethereum ? window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: constants.FUEL_TOKEN_ADDRESS,
              symbol: "FUEL",
              decimals: 18,
              image: ""
            }
          }
      }) : alert("Please connect your metamask or install metamask plugin in your browser")
    }
  },
  mounted(){   
    this.$nextTick(function () { twttr.widgets.load(); });
  }
}
</script>