import { createStore } from 'vuex'
import { POOLS } from '../consts/pools'
import BigNumber from 'bignumber.js'

const store = createStore({
  state () {
    return {
      user: {},
      userLoading: false,
      chainId: parseInt(import.meta.env.VITE_APP_CHAIN_ID),
      pools: POOLS[import.meta.env.VITE_APP_CHAIN_ID],
      fuelPrice: new BigNumber(0)
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserLoading(state, payload){
      state.userLoading = payload
    },
    setFuelPrice(state, payload){
      state.fuelPrice = payload
    }  
  },
  actions: {
    async setFuelPriceAsync(state, payload){
      state.commit("setFuelPrice", payload)
    }
  },
  getters: {
    getUser : state => state.user,
    getUserAddress: state => state.user.get('ethAddress'),
    getUserLoading: state => state.userLoading,
    getChainId: state => state.chainId,
    getPools: state => state.pools,
    isAuthenticated: state =>  Object.keys(state.user).length > 0,
    getFuelPrice: state => state.fuelPrice
  }
})

export default store