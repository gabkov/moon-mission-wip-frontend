import Moralis from '../plugins/moralis'
import store from '../store'
import { preFuelBalanceOf} from "../service/preFuelService"
import {busdBalanceOf, isApprovedBusdForPreSale} from "../service/busdService"


const setUser = (payload) => store.commit('setUser', payload)
const setUserPreFuelBalance = (payload) => store.commit('setUserPreFuelBalance', payload)
const setUserBusdBalance = (payload) => store.commit('setUserBusdBalance', payload)
const setUserApprovedBusd = (payload) => store.commit('setUserApprovedBusd', payload)


async function loginUser(){
    await Moralis.authenticate().then(user => setUser(user))
    preFuelBalanceOf(store.state.user.get('ethAddress')).then(newBalance => setUserPreFuelBalance(newBalance))
    busdBalanceOf(store.state.user.get('ethAddress')).then(newBalance => setUserBusdBalance(newBalance))
    isApprovedBusdForPreSale().then(result => setUserApprovedBusd(result))
}

async function logoutUser(){
    Moralis.User.logOut().then(() => setUser({}))
    setUserPreFuelBalance(0)
    setUserBusdBalance(0)
    setUserApprovedBusd(0)
}

export{
    loginUser,
    logoutUser
}
