import Moralis  from "../plugins/moralis"   
import preFuelAbi from "../abi/PreFuelToken.json"
import {PRE_FUEL_TOKEN_CONTRACT, BUSD_TOKEN_CONTRACT} from "../consts/constants"
import {BigNumber, ethers} from 'ethers'

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const preFuelContract = new ethers.Contract(
    PRE_FUEL_TOKEN_CONTRACT,
    preFuelAbi,
    signer
);

const busdContract = new ethers.Contract(
    BUSD_TOKEN_CONTRACT,
    preFuelAbi,
    signer
);

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

async function busdBalanceOf(address) {
    return await busdContract.balanceOf(address)
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
    preFuelBalanceOf,
    busdBalanceOf
};
