import { fuelContract } from "./contracts";
import { getHumanReadableNumber } from '../utils/format'

async function fuelBalanceOf(address) {
    return getHumanReadableNumber(await fuelContract.balanceOf(address))
}


export {
    fuelBalanceOf
}