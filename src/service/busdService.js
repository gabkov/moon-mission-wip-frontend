import {busdContract} from "./contracts"  
import {PRE_FUEL_TOKEN_CONTRACT} from "../consts/constants"
import {ethers} from 'ethers'
import store from '../store'
import { getHumanReadableNumber } from './utils'

async function busdBalanceOf(address) {
    return getHumanReadableNumber(await busdContract.balanceOf(address))
}

async function isApprovedBusdForPreSale(){
    const userAllowance = await busdContract.allowance(store.state.user.get('ethAddress'), PRE_FUEL_TOKEN_CONTRACT)
    if(userAllowance > 0){
        return true
    }
    return false
}

async function approveBusdForPreSale(){
    await busdContract.approve(PRE_FUEL_TOKEN_CONTRACT, ethers.constants.MaxUint256)
}

export {
    busdBalanceOf,
    isApprovedBusdForPreSale,
    approveBusdForPreSale
}