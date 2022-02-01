import {masterChefContract} from "./contracts"
import { getBigNumber } from "./utils"


async function poolLength(){
    return await masterChefContract.poolLength()
}

async function deposit(pid, amount){
    console.log(pid);
    console.log( getBigNumber(amount));
    await masterChefContract.deposit(pid, getBigNumber(amount))
}

async function withdraw(pid, amount){
    await masterChefContract.withdraw(pid, amount)
}

async function getPoolInfo(pid){
    return await masterChefContract.poolInfo(pid)
}

export {
    poolLength,
    deposit,
    withdraw,
    getPoolInfo
}