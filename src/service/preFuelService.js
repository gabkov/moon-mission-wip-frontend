import Moralis  from "../plugins/moralis"   
import {PRE_FUEL_TOKEN_CONTRACT} from "../consts/constants"
import {ethers} from 'ethers'
import { getBigNumber } from "./utils"
import {preFuelContract, busdContract} from "./contracts"


async function maxPurchaseAmount() {
    return await preFuelContract.maxPreFuelPurchase()
}

async function buyPreFuel(amount) {
    const userAllowance = await busdContract.allowance(Moralis.User.current().get('ethAddress'), PRE_FUEL_TOKEN_CONTRACT)
    if(userAllowance == 0){
        await busdContract.approve(PRE_FUEL_TOKEN_CONTRACT, ethers.constants.MaxUint256)
    }

    return await preFuelContract.buyPreFuel(getBigNumber(amount))  
}

async function preFuelBalanceOf(address) {
    return await preFuelContract.balanceOf(address)
}


export {
    maxPurchaseAmount,
    buyPreFuel,
    preFuelBalanceOf
};
