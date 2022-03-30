import { BigNumber } from "ethers";
import { Prediction, } from "../../../typechain";
import { Round } from "../../domain/prediction/entity";
import { getUserRounds as getUserRoundsUsecase } from "./getUserRounds";

interface Params {
  contract: Prediction
  active: boolean,
  address: string,
  dispatch: (data: any) => void
}

export const getRounds = async (params: Params) => {
  
  const {contract, address, dispatch} = params;

  const length = await contract.currentEpoch();
  let userRounds: BigNumber[] = [], betInfo: Prediction.BetInfoStructOutput[] = [];
  let bufferSeconds = await contract.bufferSeconds();
  let intervalSeconds = await contract.intervalSeconds()
  if(address){
    [userRounds, betInfo] = await getUserRoundsUsecase({ contract, address });
  }
  const _userRounds = userRounds.map((round) => round.toString());
  
  for(let i=length.toNumber(); i >= 0; i--){
    let round = (await contract.getRound(i)) as unknown as Round;
    const [, bulls, bears] = await contract.getStats(i);
    round = {...round, bulls, bears};
    if(address){
      const index = _userRounds.indexOf(round.epoch.toString());
      if(index !== -1){
        round.user = betInfo[index];
      }
    }
    dispatch({round : {[round.epoch.toString()] : round}, bufferSeconds, intervalSeconds})
  };
};

// export const getPastUserRound = async (par)


