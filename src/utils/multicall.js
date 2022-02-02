import { multiCallContract } from '../service/contracts'
import { Interface } from '@ethersproject/abi'


async function multicall(calls) {
  const calldata = calls.map((call) => {
    const itf = new Interface(call.abi)
    return [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]
  })
  const { returnData } = await multiCallContract.aggregate(calldata)
  const res = returnData.map((call, i) => {
    const itf = new Interface(calls[i].abi)
    return itf.decodeFunctionResult(calls[i].name, call)
  })

  return res
}

export {
  multicall
}