import {busdContract} from "./contracts"

async function busdBalanceOf(address) {
    return await busdContract.balanceOf(address)
}

export {
    busdBalanceOf
}