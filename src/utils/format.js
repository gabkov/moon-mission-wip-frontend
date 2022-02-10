import BigNumber from 'bignumber.js'
import {ethers} from 'ethers'


function getHumanReadableNumber  (amount, decimal = 18)  {
    const remainder = amount.mod(1e14)

    if(amount > 1){
        return ethers.utils.formatUnits(amount.sub(remainder), decimal)
    } else {
        return ethers.utils.formatUnits(amount, decimal)
    }
}

function getBigNumber(amount, decimal = 18)  {
  return ethers.utils.parseUnits(amount.toString(), decimal);
}

function getRawBalanceNumber(balance, decimals = 18)  {
  const rawBlance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
  return rawBlance.toFixed(decimals)
}

function getBalanceNumber(balance, decimals = 18)  {
  const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

function getFullDisplayBalance(balance, decimals = 18)  {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

function formatNumber(num, minPrecision = 2, maxPrecision = 2)  {
  if (num === undefined) {
    return 0
  }

  const bnNumber = new BigNumber(num).toNumber()
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision
  }

  return bnNumber.toLocaleString(undefined, options)
}

function shortenNumber(value) {
  if (value === undefined) return 0

  const parsed1 = value.toString()
  const parsed = parseInt(parsed1).toString()

  if (parsed.length < 4) {
    return parsed
  }
  if (parsed.length < 7) {
    const newValue = value / 10
    const ret = newValue.toString()
    const realRet = parseInt(ret) / 100
    return `${realRet}K`
  }
  if (parsed.length < 10) {
    const newValue = value / 10000
    const ret = newValue.toString()
    const realRet = parseInt(ret) / 100
    return `${realRet}M`
  }
  const newValue = value / 10000000
  const ret = newValue.toString()
  const realRet = parseInt(ret) / 100
  return `${realRet}B`
}

export {
  formatNumber,
  getBalanceNumber,
  getBigNumber,
  getFullDisplayBalance,
  getHumanReadableNumber,
  getRawBalanceNumber,
  shortenNumber
}
