import preFuelAbi from "../abi/PreFuelToken.json"
import fuelReedemAbi from "../abi/FuelReedem.json"
import masterChefAbi from "../abi/MasterChefAbi.json"
import ERC20 from "../abi/ERC20.json"
import {ethers} from 'ethers'
import {PRE_FUEL_TOKEN_CONTRACT, BUSD_TOKEN_CONTRACT, FUEL_TOKEN_CONTRACT, FUEL_REEDEM_CONTRACT, MASTERCHEF} from "../consts/constants"

// putting the contracts initalizations to a separate file so it is easier just to import from here instead of reinitializing everywhere

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

const fuelContract = new ethers.Contract(
    FUEL_TOKEN_CONTRACT,
    ERC20,
    signer
);

const fuelReedemContract = new ethers.Contract(
    FUEL_REEDEM_CONTRACT,
    fuelReedemAbi,
    signer
);

const masterChefContract = new ethers.Contract(
    MASTERCHEF,
    masterChefAbi,
    signer
);

function getPoolContract(tokenAddress){
    return new ethers.Contract(tokenAddress, ERC20, signer)
}

export {
    preFuelContract,
    busdContract,
    fuelContract,
    fuelReedemContract,
    masterChefContract,
    getPoolContract
}