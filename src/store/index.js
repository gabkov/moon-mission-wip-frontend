import { createStore } from 'vuex'


const store = createStore({
  state () {
    return {
      user: {},
      userLoading: false,
      chainId: process.env.VUE_APP_CHAIN_ID
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
    getChainId: state => state.chainId
  }
})

export default store