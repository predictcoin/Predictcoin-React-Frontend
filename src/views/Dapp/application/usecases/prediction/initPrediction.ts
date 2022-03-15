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

  state = PREDICTIONSTATE.ROUND_ONGOING;
  
  if(currentRound.lockedTimestamp.add(intervalSeconds).gt(Math.trunc(Date.now()/1000))){
    console.log(state, "1");
    state = PREDICTIONSTATE.ROUND_ONGOING
  }
  // if(currentRound.lockedTimestamp.add(betSeconds).gt(Math.trunc(Date.now()/1000))){
  //   console.log(state, "2");
  //   state = PREDICTIONSTATE.BETTING_ONGOING
  // }
  // if(
  //   currentRound.lockedTimestamp.add(intervalSeconds).add(bufferSeconds).lt(Math.trunc(Date.now()/1000)) &&
  //   !currentRound.oraclesCalled
  //   ){
  //     console.log(state, "3");
  //   state = PREDICTIONSTATE.ROUND_ENDED_UNSUCCESSFULLY
  // }
  // else if(
  //   currentRound.lockedTimestamp.add(intervalSeconds).add(bufferSeconds).lt(Math.trunc(Date.now()/1000)) &&
  //   currentRound.oraclesCalled
  // ){
  //   console.log(state, "4");
  //   state = PREDICTIONSTATE.ROUND_ENDED_SUCCESSFULLY
  // }

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
