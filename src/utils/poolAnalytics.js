import BigNumber from 'bignumber.js'
import { multicall } from './multicall'
import {CONSTANTS, YEAR_IN_SECONDS } from '../consts/constants'
import ERC20 from "../abi/ERC20.json"
import store from '../store'

const constants = CONSTANTS[store.state.chainId] 

function getAPR(poolWeight, fuelPerBlock, fuelDecimals, fuelPrice, tvl) {
  if (new BigNumber(tvl.toString()).eq(0)) {
    return 0
  }
  const fuelPerSecond = new BigNumber(fuelPerBlock).div(3) // average block time for bsc is 3 so we divide the per block value with 3

  const fuelPerSecondPool = new BigNumber(fuelPerSecond).times(poolWeight).div(new BigNumber(10).pow(new BigNumber(fuelDecimals.toString())))
  
  const fuelTokensPerYear = fuelPerSecondPool.times(YEAR_IN_SECONDS)

  const fuelValuePerYear = fuelPrice.times(fuelTokensPerYear)

  const apr = fuelValuePerYear.div(new BigNumber(tvl.toString())).times(100).toFixed(3)

  return apr
}

async function getFuelPrice(){
  return getTokenPrice(constants.FUEL_TOKEN_ADDRESS, constants.BUSD_TOKEN_CONTRACT, constants.FUEL_BUSD_ADDRESS)
}

async function getTokenPrice(tokenAddress, stableAddress, stablePairAddress) {
  const [tokenBal, tokenDecimals, stableBal, stableDecimals] = await multicall([
    {
      address: tokenAddress,
      name: 'balanceOf',
      abi: ERC20,
      params: [stablePairAddress]
    },
    {
      address: tokenAddress,
      name: 'decimals',
      abi: ERC20
    },
    {
      address: stableAddress,
      name: 'balanceOf',
      abi: ERC20,
      params: [stablePairAddress]
    },
    {
      address: stableAddress,
      name: 'decimals',
      abi: ERC20
    }
  ])

  let price = new BigNumber(0)
  if (new BigNumber(tokenBal.toString()).gt(0)) {
    const busdBalDecimalsFixed = new BigNumber(stableBal.toString()).div(new BigNumber(10).pow(new BigNumber(stableDecimals.toString())))
    const fuelBalDecimalsFixed = new BigNumber(tokenBal.toString()).div(new BigNumber(10).pow(new BigNumber(tokenDecimals.toString())))
    price = busdBalDecimalsFixed.div(fuelBalDecimalsFixed)
  }

  return price
}

async function getPoolTVL(mcAddress, pool){
  // Calling liquidity pair balances for amount in stable
  const [lpSupply, lpDecimals, lpTotalSupply, quoteBalance, quoteDecimals] = await multicall([
    {
      address: pool.address,
      name: 'balanceOf',
      abi: ERC20,
      params: [mcAddress]
    },
    {
      address: pool.address,
      name: 'decimals',
      abi: ERC20
    },
    {
      address: pool.address,
      abi: ERC20,
      name: 'totalSupply'
    },
    {
      address: pool.quoteTokenAddress,
      name: 'balanceOf',
      abi: ERC20,
      params: [pool.address]
    },
    {
      address: pool.quoteTokenAddress,
      name: 'decimals',
      abi: ERC20
    }
  ])

  const lpSupplyDecimalFixed = new BigNumber(lpSupply.toString()).div(new BigNumber(10).pow(lpDecimals.toString()))

  let tvl = new BigNumber(0)
  let quotePrice = new BigNumber(0)
  let lpSupplyInQuote = new BigNumber(0)

  if (pool.quoteTokenAddress === pool.stableTokenAddress) {
    quotePrice = new BigNumber(1)
  }
  if (pool.quoteTokenAddress !== pool.stableTokenAddress) {
    quotePrice = await getTokenPrice(pool.quoteTokenAddress, pool.stableTokenAddress, pool.quoteStablePairAddress)
  }

  if (pool.single === true) {
    lpSupplyInQuote = lpSupplyDecimalFixed
  }

  if (pool.single === false) {
    lpSupplyInQuote = new BigNumber(lpTotalSupply.toString()).eq(0)
      ? 0
      : new BigNumber(lpSupply.toString())
          .div(new BigNumber(lpTotalSupply.toString()))
          .times(new BigNumber(quoteBalance.toString()))
          .div(new BigNumber(10).pow(new BigNumber(quoteDecimals.toString())))
          .times(new BigNumber(2))
  }

  tvl = quotePrice.times(lpSupplyInQuote)

  return tvl
}

export {
  getAPR,
  getFuelPrice,
  getTokenPrice,
  getPoolTVL
}
