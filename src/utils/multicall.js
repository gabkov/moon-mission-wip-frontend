import { multiCallContract } from '../service/contracts';
import { Interface } from '@ethersproject/abi';
import BigNumber from 'bignumber.js';


const multicall = async (calls) => {
  const zeroBalance = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const calldata = calls.map((call) => {
    const itf = new Interface(call.abi);
    return [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)];
  });
  const { returnData } = await multiCallContract.aggregate(calldata);
  const filteredData = returnData.map((call) => {
    if (isNaN(new BigNumber(call).toNumber())) {
      return zeroBalance;
    } else {
      return call;
    }
  });
  const res = filteredData.map((call, i) => {
    const itf = new Interface(calls[i].abi);
    return itf.decodeFunctionResult(calls[i].name, call);
  });

  return res;
};

export default multicall;
