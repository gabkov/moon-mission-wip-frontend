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
    await masterChefContract.withdraw(pid, amount)
}

async function getPoolInfo(pid){
    return await masterChefContract.poolInfo(pid)
}

async function getUserPoolInfo(pid, userAddress){
    const poolUserInfo = await masterChefContract.userInfo(pid, userAddress)
    return {amount: getHumanReadableNumber(poolUserInfo.amount),rewardDebt :poolUserInfo.rewardDebt }
}

export {
    poolLength,
    deposit,
    withdraw,
    getPoolInfo,
    getUserPoolInfo
}