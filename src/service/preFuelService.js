import { getBigNumber } from "./utils"
import {preFuelContract} from "./contracts"
import {FUEL_REEDEM_CONTRACT} from "../consts/constants"
import {ethers} from 'ethers'
import store from '../store'
import { getHumanReadableNumber } from './utils'

async function maxPurchaseAmount() {
    return await preFuelContract.maxPreFuelPurchase()
}

async function buyPreFuel(amount) {
    return await preFuelContract.buyPreFuel(getBigNumber(amount))  
}

async function preFuelBalanceOf(address) {
    return getHumanReadableNumber(await preFuelContract.balanceOf(address))
}

async function isApprovedPreFuelForSwap(){
    const userAllowance = await preFuelContract.allowance(store.state.user.get('ethAddress'), FUEL_REEDEM_CONTRACT)
    if(userAllowance > 0){
        return true
    }
    return false
}

async function approvePreFuelForSwap(){
    await preFuelContract.approve(FUEL_REEDEM_CONTRACT, ethers.constants.MaxUint256)
}


export {
    maxPurchaseAmount,
    buyPreFuel,
    preFuelBalanceOf,
    isApprovedPreFuelForSwap,
    approvePreFuelForSwap
};
