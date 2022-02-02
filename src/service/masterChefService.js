import {masterChefContract} from "./contracts"
import { getBigNumber, getHumanReadableNumber } from "./utils"


async function poolLength(){
    return await masterChefContract.poolLength()
}

async function deposit(pid, amount){
    const tx = await masterChefContract.deposit(pid, getBigNumber(amount))
    const receipt = tx.wait()
    return receipt
}

async function withdraw(pid, amount){
    const tx = await masterChefContract.withdraw(pid, getBigNumber(amount))
    const receipt = tx.wait()
    return receipt
}

async function getPoolInfo(pid){
    return await masterChefContract.poolInfo(pid)
}

async function getUserPoolInfo(pid, userAddress){
    const poolUserInfo = await masterChefContract.userInfo(pid, userAddress)
    return {amount: getHumanReadableNumber(poolUserInfo.amount),rewardDebt :poolUserInfo.rewardDebt }
}

async function pendingFuelForUser(pid, userAddress){
    return getHumanReadableNumber(await masterChefContract.pendingFuel(pid, userAddress))
}

export {
    poolLength,
    deposit,
    withdraw,
    getPoolInfo,
    getUserPoolInfo,
    pendingFuelForUser
}