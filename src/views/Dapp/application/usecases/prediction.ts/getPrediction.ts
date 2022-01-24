import { Prediction__factory } from "../../../typechain";
import { Prediction, PREDICTIONSTATE } from "../../domain/prediction/entity";
import { PredictionStore } from "../../domain/prediction/predictionStore";
import { WalletStore } from "../../domain/wallet/walletStore";
import { PREDICTION_ADDRESSES } from "../../../constants/addresses";
import { ethers } from "ethers";
import { getPastUserRounds } from "./getPastUserRounds";

interface Params{
  walletStore: WalletStore
}

export const getPrediction = async (params: Params): Promise<Prediction> => {
  const { walletStore } = params;
  let { wallet: {provider}, chainId } = walletStore;
  provider = new ethers.providers.Web3Provider(provider);
  const contract = Prediction__factory.connect(PREDICTION_ADDRESSES[chainId], provider);
  const currentRound = (await contract.currentEpoch());
  if(currentRound.eq(0)){
    return {currentRound} as unknown as Prediction;
  }

  const round = await contract.getRound(currentRound.toString());
  const betAmount = (await contract.betAmount());
  const tokenMaxBet = (await contract.tokenMaxBet());
  const intervalSeconds = (await contract.intervalSeconds());
  const betSeconds = (await contract.betSeconds());
  const bufferSeconds = (await contract.bufferSeconds());
  const [userRounds, betInfos] = await getPastUserRounds({walletStore});
  let _userRounds = userRounds.map(round => userRounds.toString());
  let index = _userRounds.indexOf(round.epoch.toString());
  if( index !== -1){
    // @ts-ignore
    round.user = betInfos[index];
  }
  let state;

  state = PREDICTIONSTATE.ROUND_ENDED_SUCCESSFULLY;
  if(round.lockedTimestamp.add(betSeconds).lt(Math.trunc(Date.now()/1000))){
    state = PREDICTIONSTATE.BETTING_ONGOING
  }else if(round.lockedTimestamp.add(intervalSeconds).lt(Math.trunc(Date.now()/1000))){
    state = PREDICTIONSTATE.ROUND_ONGOING
  }else if(
    round.lockedTimestamp.add(intervalSeconds).add(bufferSeconds).lt(Math.trunc(Date.now()/1000)) &&
    !round.oraclesCalled
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
    // @ts-ignore
    round,
  };
}
