import { fuelContract } from "./contracts";
import { getHumanReadableNumber } from './utils'


async function fuelBalanceOf(address) {
    return getHumanReadableNumber(await fuelContract.balanceOf(address))
}


export {
    fuelBalanceOf
}