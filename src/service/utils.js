import {BigNumber} from 'ethers'


function getBigNumber(amount, decimal = 18) {
    return BigNumber.from(amount).mul(BigNumber.from(10).pow(decimal));
}

function getHumanReadableNumber(amount, decimal = 18) {
    return BigNumber.from(amount).div(BigNumber.from(10).pow(decimal));
}


export {
    getBigNumber,
    getHumanReadableNumber
};