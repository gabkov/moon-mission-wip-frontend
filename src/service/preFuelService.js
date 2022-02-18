import { getBigNumber } from "../utils/format"
import {preFuelContract} from "./contracts"
import {ethers} from 'ethers'
import store from '../store'
import {CONSTANTS} from "../consts/constants"

const constants = CONSTANTS[store.state.chainId] 

async function buyPreFuel(amount) {
    const tx = await preFuelContract().buyPreFuel(getBigNumber(amount))  
    
    const receipt = tx.wait()
    return receipt
}

async function approvePreFuelForSwap(){
    const tx = await preFuelContract().approve(constants.FUEL_REEDEM_CONTRACT, ethers.constants.MaxUint256)
    
    const receipt = tx.wait()
    return receipt
}


export {
    buyPreFuel,
    approvePreFuelForSwap
};
