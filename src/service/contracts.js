import preFuelAbi from "../abi/PreFuelToken.json"
import ERC20 from "../abi/ERC20.json"
import {ethers} from 'ethers'
import {PRE_FUEL_TOKEN_CONTRACT, BUSD_TOKEN_CONTRACT} from "../consts/constants"

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const preFuelContract = new ethers.Contract(
    PRE_FUEL_TOKEN_CONTRACT,
    preFuelAbi,
    signer
);

const busdContract = new ethers.Contract(
    BUSD_TOKEN_CONTRACT,
    ERC20,
    signer
);

export {
    preFuelContract,
    busdContract
}