import Moralis  from "../plugins/moralis"   
import preFuel from "../abi/PreFuelToken.json"
import {PRE_FUEL_TOKEN_CONTRACT} from "../consts/constants"
import {BigNumber} from 'ethers'



async function maxPurchaseAmount() {
    const options = {
        contractAddress: PRE_FUEL_TOKEN_CONTRACT,
        functionName: "maxPreFuelPurchase",
        abi: preFuel
    }
    
    return await Moralis.executeFunction(options)
}

function getBigNumber(amount, decimal = 18) {
    return BigNumber.from(amount).mul(BigNumber.from(10).pow(decimal));
}

function getHumanReadableNumber(amount, decimal = 18) {
    return BigNumber.from(amount).div(BigNumber.from(10).pow(decimal));
}


export {
    maxPurchaseAmount,
    getBigNumber,
    getHumanReadableNumber
};
