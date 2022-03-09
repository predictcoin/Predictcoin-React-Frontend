import { BigNumber, } from "ethers";
import { Prediction } from "../../../typechain";

interface Params {
  contract: Prediction,
  address: string,
}

export const getPastUserRounds = async (params: Params): Promise<[BigNumber[], Prediction.BetInfoStructOutput[]]> => {
  const {contract, address} = params;

  const length = await contract.getUserRoundsLength(address);
  let [rounds, betInfos] = await contract.getUserRounds(address, 0, length);

  return [rounds, betInfos];
};
