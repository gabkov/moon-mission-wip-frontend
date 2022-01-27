import { createStore } from 'vuex'
import { getHumanReadableNumber } from '../service/utils'


const store = createStore({
  state () {
    return {
      user: {},
      userPreFuelBalance: 0,
      userBusdBalance: 0,
      userApprovedBusd: false
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserPreFuelBalance(state, payload){
      state.userPreFuelBalance = getHumanReadableNumber(payload)
    },
    setUserBusdBalance(state, payload){
      state.userBusdBalance = getHumanReadableNumber(payload)
    },
    setUserApprovedBusd(state, payload){
      state.userApprovedBusd = payload
    }
  },
  getters: {
    getUser : state => state.user,
    getUserPreFuelBalance : state => state.userPreFuelBalance,
    getUserBusdBalance : state  => state.userBusdBalance,
    getUserApprovedBusd : state =>state.userApprovedBusd
  }
})

export default store