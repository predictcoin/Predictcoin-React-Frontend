import { Prediction, } from "../../../typechain";
import { Round } from "../../domain/prediction/entity";

interface Params {
  contract: Prediction
}

export const getPastRounds = async (params: Params) => {
  const {contract} = params;

  const length = await contract.currentEpoch();
  let rounds: Round[] = [];

  for(let i=0; length.sub(1).gt(i); i++){
    const round = (await contract.getRound(i)) as unknown as Round;
    rounds.push(round);
  };

  return rounds;
};
