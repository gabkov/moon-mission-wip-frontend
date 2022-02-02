import {busdContract} from "./contracts"  
import {ethers} from 'ethers'
import store from '../store'
import { getHumanReadableNumber } from './utils'
import {CONSTANTS} from "../consts/constants"

const constants = CONSTANTS[store.state.chainId] 

async function busdBalanceOf(address) {
    return getHumanReadableNumber(await busdContract.balanceOf(address))
}

async function isApprovedBusdForPreSale(){
    const userAllowance = await busdContract.allowance(store.state.user.get('ethAddress'), constants.PRE_FUEL_TOKEN_CONTRACT)
    if(userAllowance > 0){
        return true
    }
    return false
}

async function approveBusdForPreSale(){
    await busdContract.approve(constants.PRE_FUEL_TOKEN_CONTRACT, ethers.constants.MaxUint256)
}

export {
    busdBalanceOf,
    isApprovedBusdForPreSale,
    approveBusdForPreSale
}