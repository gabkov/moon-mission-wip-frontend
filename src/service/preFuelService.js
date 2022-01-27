//import Moralis  from "../plugins/moralis"   
import preFuelAbi from "../abi/PreFuelToken.json"
import {PRE_FUEL_TOKEN_CONTRACT} from "../consts/constants"
import {BigNumber, ethers} from 'ethers'

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const contractAddress = PRE_FUEL_TOKEN_CONTRACT;

const contract = new ethers.Contract(
    contractAddress,
    preFuelAbi,
    signer
);

/* const staticOptions = {
    contractAddress: PRE_FUEL_TOKEN_CONTRACT,
    abi: preFuelAbi,
} */

async function maxPurchaseAmount() {
    /* const options = {
        ...staticOptions,
        functionName: "maxPreFuelPurchase"
    }
    
    return await Moralis.executeFunction(options) */

    return await contract.maxPreFuelPurchase()
}

async function buyPreFuel(amount) {
    /* const options = {
        ...staticOptions,
        functionName: "buyPreFuel",
        params: {
            _busdSpent: getBigNumber(amount),
        }
    }
    return await Moralis.executeFunction(options) */

    return await contract.buyPreFuel(getBigNumber(amount))
}

async function preFuelBalanceOF(address) {
    /* const options = {
        ...staticOptions,
        functionName: "balanceOf",
        params: {
            account: address,
        }
    } 
    return await Moralis.executeFunction(options) */
    
    return await contract.balanceOf(address)
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
    getHumanReadableNumber,
    buyPreFuel,
    preFuelBalanceOF
};
