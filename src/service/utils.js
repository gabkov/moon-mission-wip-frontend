import {BigNumber} from 'ethers'
import {ethers} from 'ethers'


function getBigNumber(amount, decimal = 18) {
    return BigNumber.from(amount).mul(BigNumber.from(10).pow(decimal));
}

function getHumanReadableNumber(amount, decimal = 18) {
    const remainder = amount.mod(1e14);
    
    if(amount > 1){
        return ethers.utils.formatUnits(amount.sub(remainder), decimal)
    } else {
        return ethers.utils.formatUnits(amount, decimal)
    }
}


export {
    getBigNumber,
    getHumanReadableNumber
};