import { createStore } from 'vuex'
import { POOLS } from '../consts/pools'


const store = createStore({
  state () {
    return {
      user: Object,
      userLoading: false,
      chainId: import.meta.env.VITE_APP_CHAIN_ID,
      pools: POOLS[import.meta.env.VITE_APP_CHAIN_ID]
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserLoading(state, payload){
      state.userLoading = payload
    },
  },
  getters: {
    getUser : state => state.user,
    getUserAddress: state => state.user.get('ethAddress'),
    getUserLoading: state => state.userLoading,
    getChainId: state => state.chainId,
    getPools: state => state.pools
  }
})

export default store