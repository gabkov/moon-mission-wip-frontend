import { getBigNumber } from "./utils"
import {preFuelContract} from "./contracts"


async function maxPurchaseAmount() {
    return await preFuelContract.maxPreFuelPurchase()
}

async function buyPreFuel(amount) {
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
