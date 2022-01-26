import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      user: {}
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  getters: {
    getUser : state => state.user
  }
})

export default store