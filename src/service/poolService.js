import { getPoolContract } from "./contracts"
import store from '../store'
import {ethers} from 'ethers'
import { getHumanReadableNumber } from './utils'
import {CONSTANTS} from "../consts/constants"

const constants = CONSTANTS[store.state.chainId] 

async function getTokenBalanceForUser(tokenAddress, userAddress){
    const tokenContract = getPoolContract(tokenAddress)
    return getHumanReadableNumber(await tokenContract.balanceOf(userAddress))
}

async function isApprovedMasterChef(tokenAddress){
    const tokenContract = getPoolContract(tokenAddress)
    const userAllowance = await tokenContract.allowance(store.state.user.get('ethAddress'), constants.MASTERCHEF)
    if(userAllowance > 0){
        return true
    }
    return false
}

async function approveTokenForMasterChef(tokenAddress){
    const tokenContract = getPoolContract(tokenAddress)
    const tx = await tokenContract.approve(constants.MASTERCHEF, ethers.constants.MaxUint256)

    const receipt = tx.wait()
    return receipt
}

export {
    isApprovedMasterChef,
    approveTokenForMasterChef,
    getTokenBalanceForUser
}