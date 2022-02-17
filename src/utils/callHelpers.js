import BigNumber from 'bignumber.js'
import { multicall } from './multicall'
import { getAPR, getFuelPrice, getTokenPrice } from './poolAnalytics'
import masterChefAbi from "../abi/MasterChefAbi.json"
import ERC20 from "../abi/ERC20.json"
import {CONSTANTS } from '../consts/constants'
import store from '../store'
import preFuelAbi from "../abi/PreFuelToken.json"

const constants = CONSTANTS[store.state.chainId] 

async function callPreSaleInfo(account){
  const calls = [
    {
      address:  constants.PRE_FUEL_TOKEN_CONTRACT,
      name:  'balanceOf',
      abi:  preFuelAbi,
      params: [account]
    },
    {
      address:  constants.PRE_FUEL_TOKEN_CONTRACT,
      name:  'allowance',
      abi:  preFuelAbi,
      params: [account, constants.FUEL_REEDEM_CONTRACT]
    },
    {
      address: constants.PRE_FUEL_TOKEN_CONTRACT,
      name: 'decimals',
      abi: ERC20
    },
    {
      address:  constants.BUSD_TOKEN_CONTRACT,
      name:  'balanceOf',
      abi:  ERC20,
      params: [account]
    },
    {
      address:  constants.BUSD_TOKEN_CONTRACT,
      name:  'allowance',
      abi:  ERC20,
      params: [account, constants.PRE_FUEL_TOKEN_CONTRACT]
    },
    {
      address: constants.BUSD_TOKEN_CONTRACT,
      name: 'decimals',
      abi: ERC20
    },
    {
      address:  constants.FUEL_TOKEN_ADDRESS,
      name:  'balanceOf',
      abi:  ERC20,
      params: [account]
    },
    {
      address: constants.FUEL_TOKEN_ADDRESS,
      name: 'decimals',
      abi: ERC20
    },
  ]

  const [preFuelBalance, preFuelAllowance, preFuelDecimals, busdBalance, busdAllowance, busdDecimals, fuelBalance, fuelDecimals] = await multicall(calls)

  return {
    preFuelBalance: new BigNumber(preFuelBalance.toString()), 
    preFuelAllowance: new BigNumber(preFuelAllowance.toString()),
    preFuelDecimals: new BigNumber(preFuelDecimals.toString()).toNumber(),
    busdBalance: new BigNumber(busdBalance.toString()), 
    busdAllowance: new BigNumber(busdAllowance.toString()), 
    busdDecimals: new BigNumber(busdDecimals.toString()).toNumber(),
    fuelBalance: new BigNumber(fuelBalance.toString()),
    fuelDecimals: new BigNumber(fuelDecimals.toString()).toNumber(),
  }
}

async function callPoolAnalytics( pool, account) {
  const userRelatedCalls = [
    {
      address:  constants.MASTERCHEF,
      name:  'userInfo',
      abi:  masterChefAbi,
      params: [pool.pid, account]
    },
    {
      address: pool.address,
      name: 'balanceOf',
      abi: ERC20,
      params: [account]
    },
    {
      address: constants.MASTERCHEF,
      name: 'pendingFuel',
      abi: masterChefAbi,
      params: [pool.pid, account]
    },
    {
      address: pool.address,
      abi: ERC20,
      name: 'allowance',
      params: [account, constants.MASTERCHEF]
    },
  ]
  // Initialise these values in case user not logged in the basic infos still available
  let stakedInfo = {amount: new BigNumber(0)}
  let stakingTokenBalance = [new BigNumber(0)]
  let [pendingFuel, userAllowance] =  new Array(2).fill(new BigNumber(0));
  if(account !== null){
      [stakedInfo, stakingTokenBalance, pendingFuel, userAllowance] = await multicall(userRelatedCalls)
  }

  // Calling liquidity pair balances for amount in stable
  const liquidityCalls = [
    {
      address: constants.MASTERCHEF,
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
    },
    {
      address: constants.MASTERCHEF,
      name: 'poolInfo',
      abi: masterChefAbi,
      params: [pool.pid]
    },
    {
      address: constants.MASTERCHEF,
      name: 'totalAllocPoint',
      abi: masterChefAbi
    },
    {
      address: constants.MASTERCHEF,
      name: 'fuelPerBlock',
      abi: masterChefAbi
    }
  ]

  const [lpSupplyPool, lpDecimals, lpTotalSupply, quoteBalance, quoteDecimals, fuelDecimals, poolInfo, totalAllocPoint, fuelPerBlock] = await multicall(liquidityCalls)
  const lpSupply = lpSupplyPool.lpSupply
  const depositFeeBp = lpSupplyPool.depositFeeBP
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
  const daily = new BigNumber(poolAPR).div(365).toFixed(3)

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
    rewards: rewards.div(new BigNumber(10).pow(18)), // DCAU decimals
    depositFeeBp: new BigNumber(depositFeeBp).toNumber()
  }
}

export {
  callPoolAnalytics,
  callPreSaleInfo
}
