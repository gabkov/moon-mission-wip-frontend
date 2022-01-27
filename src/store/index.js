import { createStore } from 'vuex'
import { getHumanReadableNumber } from '../service/utils'
import {} from "../service/events"


const store = createStore({
  state () {
    return {
      user: {},
      userPreFuelBalance: 0,
      userBusdBalance: 0,
      userApprovedBusd: false
    }
  },
  actions: {
    async setUserPreFuelBalanceAsync(context, payload){
      context.commit("setUserPreFuelBalance", getHumanReadableNumber(payload))
    },
    async setUserBusdBalanceAsync(context, payload){
      context.commit("setUserBusdBalance", getHumanReadableNumber(payload))
    },
    async setUserApprovedBusdAsync(context, payload){
      context.commit("setUserApprovedBusd", payload)
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserPreFuelBalance(state, payload){
      state.userPreFuelBalance = payload
    },
    setUserBusdBalance(state, payload){
      state.userBusdBalance = payload
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