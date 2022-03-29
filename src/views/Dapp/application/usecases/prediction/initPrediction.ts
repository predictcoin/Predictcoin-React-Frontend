import { Prediction } from "../../../typechain";
import { getPastUserRounds } from "./getPastUserRounds";
import { PredictionStore } from "../../domain/prediction/predictionStore";
import { PREDICTIONSTATE, Round } from "../../domain/prediction/entity";


interface Params{
  contract: Prediction,
  active: boolean,
  address: string,
}

export const initPrediction = async (params: Params): 
  Promise<Pick<PredictionStore, 
    "state" | "currentRound" 
    | "betAmount" | "tokenMaxBet" | "intervalSeconds"
    | "betSeconds" | "bufferSeconds" | "hasBet"
    >> => {

  const {contract, active, address} = params;
  const currentRoundNo = (await contract.currentEpoch());
  if(currentRoundNo.eq(0)){
    return { currentRoundNo } as unknown as PredictionStore;
  }

  let currentRound = await contract.getRound(currentRoundNo.toString()) as Round;
  const [, bulls, bears] = await contract.getStats(currentRoundNo)
  currentRound = {...currentRound, bulls, bears};
  const betAmount = (await contract.betAmount());
  const tokenMaxBet = (await contract.tokenMaxBet());
  const intervalSeconds = (await contract.intervalSeconds());
  const betSeconds = (await contract.betSeconds());
  const bufferSeconds = (await contract.bufferSeconds());
  let pastUserRounds, hasBet = false;
  if (active){
    pastUserRounds = await getPastUserRounds({ contract, address });
    if(pastUserRounds[0].length !== 0) {
      hasBet = pastUserRounds[0][pastUserRounds[0].length-1].eq(currentRoundNo);
    }

  }
  let state;
  
  state = PREDICTIONSTATE.ROUND_ONGOING;
  
  if(currentRound.lockedTimestamp.add(intervalSeconds).gt(Math.trunc(Date.now()/1000))){
    state = PREDICTIONSTATE.ROUND_ONGOING
  }
  if(currentRound.lockedTimestamp.add(betSeconds).gt(Math.trunc(Date.now()/1000))){
    state = PREDICTIONSTATE.BETTING_ONGOING
  }
  if(
    currentRound.lockedTimestamp.add(intervalSeconds).add(bufferSeconds).lt(Math.trunc(Date.now()/1000)) &&
    !currentRound.oraclesCalled
    ){
    state = PREDICTIONSTATE.ROUND_ENDED_UNSUCCESSFULLY
  }
  else if(
    currentRound.lockedTimestamp.add(intervalSeconds).add(bufferSeconds).lt(Math.trunc(Date.now()/1000)) &&
    currentRound.oraclesCalled
  ){
    state = PREDICTIONSTATE.ROUND_ENDED_SUCCESSFULLY
  }

  return {
    state,
    currentRound,
    betAmount,
    tokenMaxBet,
    intervalSeconds,
    betSeconds,
    bufferSeconds,
    hasBet
  };
}
