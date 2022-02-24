import {masterChefContract} from "./contracts"
import { getBigNumber } from "../utils/format"


async function deposit(pid, amount){
    const tx = await masterChefContract().deposit(pid, getBigNumber(amount))
    const receipt = tx.wait()
    return receipt
}

async function withdraw(pid, amount){
    const tx = await masterChefContract().withdraw(pid, getBigNumber(amount))
    const receipt = tx.wait()
    return receipt
}


async function add(allocPoint, address, depositFeeBP, withUpdate){
    const tx = await masterChefContract().add(allocPoint, address, depositFeeBP, withUpdate)
    const receipt = tx.wait()
    return receipt
}

async function set(pid, allocPoint, depositFeeBP, withUpdate){
    const tx = await masterChefContract().set(pid, allocPoint, depositFeeBP, withUpdate)
    const receipt = tx.wait()
    return receipt
}


export {
    deposit,
    withdraw,
    add,
    set
}