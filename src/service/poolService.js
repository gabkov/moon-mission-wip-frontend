import { getPoolContract } from "./contracts"
import store from '../store'
import {ethers} from 'ethers'
import {CONSTANTS} from "../consts/constants"

const constants = CONSTANTS[store.state.chainId] 


async function approveTokenForMasterChef(tokenAddress){
    const tokenContract = getPoolContract(tokenAddress)
    const tx = await tokenContract.approve(constants.MASTERCHEF, ethers.constants.MaxUint256)

    const receipt = tx.wait()
    return receipt
}

export {
    approveTokenForMasterChef
}