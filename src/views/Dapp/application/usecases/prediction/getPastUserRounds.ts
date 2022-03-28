import { BigNumber, } from "ethers";
import { Prediction } from "../../../typechain";
import { Round } from "../../domain/prediction/entity";

interface Params1 {
  contract: Prediction,
  address: string,
}

export const getPastUserRounds = async (params: Params1): Promise<[BigNumber[], Prediction.BetInfoStructOutput[]]> => {
  const {contract, address} = params;

  const length = await contract.getUserRoundsLength(address);
  let [rounds, betInfos] = await contract.getUserRounds(address, 0, length);

  return [rounds, betInfos];
};

interface Params2 {
  contract: Prediction,
  address: string,
  round: Round
}
export const getPastUserRound = async (params: Params2): Promise<Round> => {
  const {contract, address, round} = params;
  const [userRounds, betInfos] = await getPastUserRounds({contract, address});
  const index = userRounds.indexOf(round.epoch)
  round.user = betInfos[index];
  return round;
}