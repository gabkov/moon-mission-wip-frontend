//import Moralis  from "../plugins/moralis"   
import { createStore } from 'vuex'
import preFuelAbi from "../abi/PreFuelToken.json"
import {PRE_FUEL_TOKEN_CONTRACT} from "../consts/constants"
import {ethers} from 'ethers'
import {preFuelBalanceOf, getHumanReadableNumber, busdBalanceOf} from "../service/preFuelService"


const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const preFuelContract = new ethers.Contract(
    PRE_FUEL_TOKEN_CONTRACT,
    preFuelAbi,
    signer
);

preFuelContract.on("PreFuelPurchased", (from, to, boughtAmount) => {
  console.log(`${boughtAmount} pre fuel purchased by ${from} for ${to} BUSD`);
  
  if(store.state.user.get('ethAddress') === from.toLowerCase()){
    preFuelBalanceOf(from)
    .then(newBalance => store.dispatch("setUserPreFuelBalanceAsync", newBalance))

    busdBalanceOf(from)
    .then(newBalance => store.dispatch("setUserBusdBalanceAsync", newBalance))
  }
});


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