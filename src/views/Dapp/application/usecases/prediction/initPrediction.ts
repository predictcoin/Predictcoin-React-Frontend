import { Prediction } from "../../../typechain";
import { getUserRounds } from "./getUserRounds";
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
    | "betSeconds" | "bufferSeconds" | "rounds"
    >> => {

  const {contract, address} = params;
  const currentRound = (await contract.currentEpoch()).toNumber();
  if(currentRound === 0){
    return { currentRound } as unknown as PredictionStore;
  }

  let round = await contract.getRound(currentRound.toString()) as Round;
  const [, bulls, bears] = await contract.getStats(currentRound)
  round = {...round, bulls, bears};
  const betAmount = (await contract.betAmount());
  const tokenMaxBet = (await contract.tokenMaxBet());
  const intervalSeconds = (await contract.intervalSeconds());
  const betSeconds = (await contract.betSeconds());
  const bufferSeconds = (await contract.bufferSeconds());
  if(address){
    let [userRounds, betInfo] = await getUserRounds({ contract, address });
    const _userRounds = userRounds.map((round) => round.toString());
    const index = _userRounds.indexOf(round.epoch.toString());
      if(index !== -1){
        round.user = betInfo[index];
      }
  }
  

  let state;
  
  state = PREDICTIONSTATE.ROUND_ONGOING;
  
  if(round.lockedTimestamp.add(intervalSeconds).gt(Math.trunc(Date.now()/1000))){
    state = PREDICTIONSTATE.ROUND_ONGOING
  }
  if(round.lockedTimestamp.add(betSeconds).gt(Math.trunc(Date.now()/1000))){
    state = PREDICTIONSTATE.BETTING_ONGOING
  }
  if(
    round.lockedTimestamp.add(intervalSeconds).add(bufferSeconds).lt(Math.trunc(Date.now()/1000)) &&
    !round.oraclesCalled
    ){
    state = PREDICTIONSTATE.ROUND_ENDED_UNSUCCESSFULLY
  }
  else if(
    round.lockedTimestamp.add(intervalSeconds).add(bufferSeconds).lt(Math.trunc(Date.now()/1000)) &&
    round.oraclesCalled
  ){
    state = PREDICTIONSTATE.ROUND_ENDED_SUCCESSFULLY
  }

  return {
    state,
    currentRound,
    rounds: {currentRound: round},
    betAmount,
    tokenMaxBet,
    intervalSeconds,
    betSeconds,
    bufferSeconds,
  };
}
