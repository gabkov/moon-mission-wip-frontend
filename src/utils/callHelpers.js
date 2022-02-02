import BigNumber from 'bignumber.js';
import multicall from './multicall'
import { getAPR, getFuelPrice, getTokenPrice } from './poolAnalytics'
import masterChefAbi from "../abi/MasterChefAbi.json"
import ERC20 from "../abi/ERC20.json"
import {CONSTANTS } from '../consts/constants'
import store from '../store'

const constants = CONSTANTS[store.state.chainId] 

async function callPoolAnalytics(mcAddress, pool, account) {
  const calls = [
    {
      address:  mcAddress,
      name:  'userInfo',
      abi:  masterChefAbi,
      params: [pool.pid, account]
    },
    {
      address: mcAddress,
      name: 'poolInfo',
      abi: masterChefAbi,
      params: [pool.pid]
    },
    {
      address: mcAddress,
      name: 'totalAllocPoint',
      abi: masterChefAbi
    },
    {
      address: mcAddress,
      name: 'fuelPerBlock',
      abi: masterChefAbi
    },
    {
      address: pool.address,
      name: 'balanceOf',
      abi: ERC20,
      params: [account]
    },
    {
      address: mcAddress,
      name: 'pendingFuel',
      abi: masterChefAbi,
      params: [pool.pid, account]
    }
  ]
  const [stakedInfo, poolInfo, totalAllocPoint, fuelPerBlock, stakingTokenBalance, pendingFuel] = await multicall(calls)

  // Calling liquidity pair balances for amount in stable
  const liquidityCalls = [
    {
      address: mcAddress,
      name: 'poolInfo',
      abi: masterChefAbi,
      params: [pool.pid]
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
      address: pool.address,
      abi: ERC20,
      name: 'allowance',
      params: [account, mcAddress]
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
    },
    {
      address: constants.FUEL_TOKEN_ADDRESS,
      name: 'decimals',
      abi: ERC20
    }
  ]

  const [lpSupplyPool, lpDecimals, lpTotalSupply, userAllowance, quoteBalance, quoteDecimals, fuelDecimals] = await multicall(liquidityCalls)
  const lpSupply = lpSupplyPool.lpSupply
  const stakedAmount = stakedInfo.amount

  const stakedAmountDecimalFixed = new BigNumber(stakedAmount.toString()).div(new BigNumber(10).pow(lpDecimals.toString()))
  const lpSupplyDecimalFixed = new BigNumber(lpSupply.toString()).div(new BigNumber(10).pow(lpDecimals.toString()))

  const poolWeight = new BigNumber(totalAllocPoint.toString()).eq(0)
    ? 0
    : new BigNumber(poolInfo.allocPoint.toString()).div(new BigNumber(totalAllocPoint.toString()))

  let quotePrice = new BigNumber(0)
  let stakedInQuote = new BigNumber(0)
  let lpSupplyInQuote = new BigNumber(0)
  let lpSupplyInQuoteMC = new BigNumber(0)

  if (pool.quoteTokenAddress === pool.stableTokenAddress) {
    quotePrice = new BigNumber(1)
  }
  if (pool.quoteTokenAddress !== pool.stableTokenAddress) {
    quotePrice = await getTokenPrice(pool.quoteTokenAddress, pool.stableTokenAddress, pool.quoteStablePairAddress)
  }

  if (pool.single === true) {
    stakedInQuote = stakedAmountDecimalFixed
    lpSupplyInQuote = lpSupplyDecimalFixed
    lpSupplyInQuoteMC = new BigNumber(poolInfo.lpSupply.toString()).div(new BigNumber(10).pow(lpDecimals.toString()))
  }

  if (pool.single === false) {
    lpSupplyInQuote = new BigNumber(lpTotalSupply.toString()).eq(0)
      ? 0
      : new BigNumber(lpSupply.toString())
          .div(new BigNumber(lpTotalSupply.toString()))
          .times(new BigNumber(quoteBalance.toString()))
          .div(new BigNumber(10).pow(new BigNumber(quoteDecimals.toString())))
          .times(new BigNumber(2))

    lpSupplyInQuoteMC = new BigNumber(lpTotalSupply.toString()).eq(0)
      ? 0
      : new BigNumber(poolInfo.lpSupply.toString())
          .div(new BigNumber(lpTotalSupply.toString()))
          .times(new BigNumber(quoteBalance.toString()))
          .div(new BigNumber(10).pow(new BigNumber(quoteDecimals.toString())))
          .times(new BigNumber(2))

    stakedInQuote = new BigNumber(lpSupply.toString()).eq(0)
      ? 0
      : new BigNumber(stakedAmountDecimalFixed.toString())
          .div(new BigNumber(lpSupplyDecimalFixed.toString()))
          .times(new BigNumber(lpSupplyInQuote.toString()))
  }

  const stakedAmountUSD = quotePrice.times(stakedInQuote)
  const tvl = quotePrice.times(lpSupplyInQuote)
  const tvlMC = quotePrice.times(lpSupplyInQuoteMC)

  const fuelPrice = await getFuelPrice()

  const poolAPR = getAPR(poolWeight, fuelPerBlock, fuelDecimals, fuelPrice, tvlMC)
  const daily = new BigNumber(poolAPR).div(365).toFixed(2)

  let rewards = new BigNumber(0)
  const pendingFuelBN = new BigNumber(pendingFuel.toString())
  rewards = pendingFuelBN
  
  return {
    stakedAmount: new BigNumber(stakedAmount.toString()),
    stakedAmountUSD: stakedAmountUSD,
    allocPoint: new BigNumber(poolInfo.allocPoint.toString()).div(100),
    totalAllocPoint,
    fuelPerBlock,
    tvl,
    lpDecimals: new BigNumber(lpDecimals.toString()).toNumber(),
    poolAPR,
    daily,
    stakingTokenBalance,
    userAllowance: new BigNumber(userAllowance.toString()),
    rewards: rewards.div(new BigNumber(10).pow(18)) // DCAU decimals
  }
}

export {
  callPoolAnalytics
}
