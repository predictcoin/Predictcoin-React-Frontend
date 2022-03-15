import { Prediction, } from "../../../typechain";
import { Round } from "../../domain/prediction/entity";
import { getPastUserRounds as getPastUserRoundsUsecase } from "../../usecases/prediction/getPastUserRounds";

interface Params {
  contract: Prediction
  active: boolean,
  address: string
}

export const getPastRounds = async (params: Params) => {
  const {contract, active, address} = params;

  const length = await contract.currentEpoch();
  let rounds: Round[] = [];

  for(let i=0; length.sub(1).gt(i); i++){
    const round = (await contract.getRound(i)) as unknown as Round;
    rounds.push(round);
  };

  if(active){
    const [userRounds, betInfo] = await getPastUserRoundsUsecase({ contract, address });
    console.log(userRounds, betInfo);
    const _userRounds = userRounds.map((round) => round.toString());
    rounds = rounds.map(round =>{
      const index = _userRounds.indexOf(round.epoch.toString());
      if(index !== -1){
        round.user = betInfo[index];
      }
      return round;
    })
  }

  console.log(rounds);
  return rounds;
};


