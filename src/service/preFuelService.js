import { getBigNumber } from "../utils/format"
import {preFuelContract} from "./contracts"
import {ethers} from 'ethers'
import store from '../store'
import { getHumanReadableNumber } from '../utils/format'
import {CONSTANTS} from "../consts/constants"

const constants = CONSTANTS[store.state.chainId] 

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
    const userAllowance = await preFuelContract.allowance(store.state.user.get('ethAddress'), constants.FUEL_REEDEM_CONTRACT)
    if(userAllowance > 0){
        return true
    }
    return false
}

async function approvePreFuelForSwap(){
    await preFuelContract.approve(constants.FUEL_REEDEM_CONTRACT, ethers.constants.MaxUint256)
}


export {
    maxPurchaseAmount,
    buyPreFuel,
    preFuelBalanceOf,
    isApprovedPreFuelForSwap,
    approvePreFuelForSwap
};
