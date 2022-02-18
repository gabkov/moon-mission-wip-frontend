import preFuelAbi from "../abi/PreFuelToken.json"
import fuelReedemAbi from "../abi/FuelReedem.json"
import masterChefAbi from "../abi/MasterChefAbi.json"
import multiCallAbi from "../abi/Multicall.json"
import ERC20 from "../abi/ERC20.json"
import {ethers} from 'ethers'
import store from '../store'
import {CONSTANTS} from "../consts/constants"
import Moralis from '../plugins/moralis'


const constants = CONSTANTS[store.state.chainId] 


// putting the contracts initalizations to a separate file so it is easier just to import from here instead of reinitializing everywhere



let signer = null

if (!Moralis.User.current()) {
    signer = getJsonRpcProvider()
}else{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
}

store.watch(state => state.user,(userObject) => {
    if(Object.keys(userObject).length > 0){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner()
    }
})


function getJsonRpcProvider(){
    return new ethers.providers.JsonRpcProvider(constants.NODE_URL)
}


const preFuelContract = () => new ethers.Contract(
    constants.PRE_FUEL_TOKEN_CONTRACT,
    preFuelAbi,
    signer
);

const busdContract = () => new ethers.Contract(
    constants.BUSD_TOKEN_CONTRACT,
    ERC20,
    signer
);

const fuelContract = () => new ethers.Contract(
    constants.FUEL_TOKEN_ADDRESS,
    ERC20,
    signer
);

const fuelReedemContract = () => new ethers.Contract(
    constants.FUEL_REEDEM_CONTRACT,
    fuelReedemAbi,
    signer
);

const masterChefContract = () => new ethers.Contract(
    constants.MASTERCHEF,
    masterChefAbi,
    signer
);


const multiCallContract = () => new ethers.Contract(
    constants.MULTICALL,
    multiCallAbi,
    signer
);

function getPoolContract(tokenAddress){
    return new ethers.Contract(tokenAddress, ERC20, signer)
}

export {
    getJsonRpcProvider,
    preFuelContract,
    busdContract,
    fuelContract,
    fuelReedemContract,
    masterChefContract,
    multiCallContract,
    getPoolContract
}