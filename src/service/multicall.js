import { Interface } from '@ethersproject/abi';
import { multiCallContract } from './contracts';


const multicall = async (abi, calls) => {
  const itf = new Interface(abi);

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]);
  const { returnData } = await multiCallContract.aggregate(calldata);
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call));

  return res;
};

export default multicall;
