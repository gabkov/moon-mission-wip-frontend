import { getPoolContract } from "./contracts"
import {MASTERCHEF} from "../consts/constants"
import store from '../store'
import {ethers} from 'ethers'
import { getHumanReadableNumber } from './utils'


async function getTokenBalanceForUser(tokenAddress, userAddress){
    const tokenContract = getPoolContract(tokenAddress)
    return getHumanReadableNumber(await tokenContract.balanceOf(userAddress))
}

async function isApprovedMasterChef(tokenAddress){
    const tokenContract = getPoolContract(tokenAddress)
    const userAllowance = await tokenContract.allowance(store.state.user.get('ethAddress'), MASTERCHEF)
    if(userAllowance > 0){
        return true
    }
    return false
}

async function approveTokenForMasterChef(tokenAddress){
    const tokenContract = getPoolContract(tokenAddress)
    const tx = await tokenContract.approve(MASTERCHEF, ethers.constants.MaxUint256)

    const receipt = tx.wait()
    return receipt
}

export {
    isApprovedMasterChef,
    approveTokenForMasterChef,
    getTokenBalanceForUser
}