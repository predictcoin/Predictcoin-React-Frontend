import { Prediction, Prediction__factory } from "../../../typechain";
import { WalletStore } from "../../domain/wallet/walletStore";
import { PREDICTION_ADDRESSES } from "../../../constants/addresses";
import { ethers } from "ethers";
import { getPastUserRounds } from "./getPastUserRounds";
import { PredictionStore } from "../../domain/prediction/predictionStore";
import { PREDICTIONSTATE } from "../../domain/prediction/entity";

interface Params{
  walletStore: WalletStore
}

export const initPrediction = async (params: Params): 
  Promise<Pick<PredictionStore, 
    "state" | "currentRound" | "contract" 
    | "betAmount" | "tokenMaxBet" | "intervalSeconds"
    | "betSeconds" | "bufferSeconds"
    >> => {
  const { walletStore } = params;
  let { wallet: {provider}, chainId } = walletStore;
  provider = new ethers.providers.Web3Provider(provider);
  const contract = Prediction__factory.connect(PREDICTION_ADDRESSES[chainId], provider);
  const currentRoundNo = (await contract.currentEpoch());

  if(currentRoundNo.eq(0)){
    return {currentRoundNo} as unknown as PredictionStore;
  }

  const currentRound = await contract.getRound(currentRoundNo.toString());
  const betAmount = (await contract.betAmount());
  const tokenMaxBet = (await contract.tokenMaxBet());
  const intervalSeconds = (await contract.intervalSeconds());
  const betSeconds = (await contract.betSeconds());
  const bufferSeconds = (await contract.bufferSeconds());
  const [userRounds, betInfos] = await getPastUserRounds({walletStore});
  let _userRounds = userRounds.map(round => userRounds.toString());
  let index = _userRounds.indexOf(currentRound.epoch.toString());
  if( index !== -1){
    // @ts-ignore
    round.user = betInfos[index];
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
    contract,
    betAmount,
    tokenMaxBet,
    intervalSeconds,
    betSeconds,
    bufferSeconds,
  };
}
