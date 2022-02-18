import {busdContract} from "./contracts"  
import {ethers} from 'ethers'
import store from '../store'
import {CONSTANTS} from "../consts/constants"

const constants = CONSTANTS[store.state.chainId] 

async function approveBusdForPreSale(){
    const tx = await busdContract().approve(constants.PRE_FUEL_TOKEN_CONTRACT, ethers.constants.MaxUint256)

    const receipt = tx.wait()
    return receipt
}

export {
    approveBusdForPreSale
}