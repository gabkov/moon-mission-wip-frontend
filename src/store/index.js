import { createStore } from 'vuex'
import { getHumanReadableNumber } from '../service/utils'
import {} from "../service/events"


const store = createStore({
  state () {
    return {
      user: {},
      userPreFuelBalance: 0,
      userBusdBalance: 0
    }
  },
  actions: {
    async setUserPreFuelBalanceAsync(context, payload){
      context.commit("setUserPreFuelBalance", getHumanReadableNumber(payload))
    },
    async setUserBusdBalanceAsync(context, payload){
      context.commit("setUserBusdBalance", getHumanReadableNumber(payload))
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
    }
  },
  getters: {
    getUser : state => state.user,
    getUserPreFuelBalance : state => state.userPreFuelBalance,
    getUserBusdBalance : state  => state.userBusdBalance
  }
})

export default store