import { Prediction } from "../../../typechain";
import { getPastUserRounds } from "./getPastUserRounds";
import { PredictionStore } from "../../domain/prediction/predictionStore";
import { PREDICTIONSTATE } from "../../domain/prediction/entity";


interface Params{
  contract: Prediction,
  active: boolean,
  address: string,
}

export const initPrediction = async (params: Params): 
  Promise<Pick<PredictionStore, 
    "state" | "currentRound" 
    | "betAmount" | "tokenMaxBet" | "intervalSeconds"
    | "betSeconds" | "bufferSeconds" | "pastUserRounds"
    >> => {

  const {contract, active, address} = params;
  const currentRoundNo = (await contract.currentEpoch());

  if(currentRoundNo.eq(0)){
    return { currentRoundNo } as unknown as PredictionStore;
  }

  const currentRound = await contract.getRound(currentRoundNo.toString());
  const betAmount = (await contract.betAmount());
  const tokenMaxBet = (await contract.tokenMaxBet());
  const intervalSeconds = (await contract.intervalSeconds());
  const betSeconds = (await contract.betSeconds());
  const bufferSeconds = (await contract.bufferSeconds());
  let pastUserRounds;
  if (active){
    pastUserRounds = await getPastUserRounds({ contract, address });
  }
  let state;

  state = PREDICTIONSTATE.ROUND_ENDED_SUCCESSFULLY;
  if(currentRound.lockedTimestamp.add(betSeconds).lt(Math.trunc(Date.now()/1000))){
    state = PREDICTIONSTATE.BETTING_ONGOING
  }else if(currentRound.lockedTimestamp.add(intervalSeconds).lt(Math.trunc(Date.now()/1000))){
    state = PREDICTIONSTATE.ROUND_ONGOING
  }else if(
    currentRound.lockedTimestamp.add(intervalSeconds).add(bufferSeconds).lt(Math.trunc(Date.now()/1000)) &&
    !currentRound.oraclesCalled
    ){
    state = PREDICTIONSTATE.ROUND_ENDED_UNSUCCESSFULLY
  }


  return {
    state,
    currentRound,
    betAmount,
    tokenMaxBet,
    intervalSeconds,
    betSeconds,
    bufferSeconds,
    pastUserRounds,
  };
}
