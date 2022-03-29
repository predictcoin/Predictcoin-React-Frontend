import { predict as predictUsecase } from "../usecases/prediction/predict";
import { withdraw as withdrawUsecase } from "../usecases/prediction/withdraw";
import { DIRECTION } from "../domain/prediction/entity";
import { PREDICTION_ADDRESSES, PREDICTION_TOKEN_ADDRESSES } from "../../constants/addresses";
import useTransaction, { SendParams } from "../../hooks/useTransaction";
import { usePredictionStore } from "../infrastructure/redux/stores/prediction";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  getPastRounds as getPastRoundsAction, 
  initPrediction as initPredictionAction,
  getPastUserRound as getPastUserRoundAction
} from "../../application/infrastructure/redux/actions/prediction";
import { useWalletViewModel } from "./walletViewModel";
import { Prediction__factory } from "../../typechain";
import PredictionUserDataModel, { Position, Status } from "../../models/PredictionDataModel";
import { getPredictionTokenName } from "../../lib/utils/token";
import { TokenImages } from "../../constants/images";
import { displayTokenValue, toNumberLib } from "../../lib/utils/number";
import { BigNumber } from "ethers";
import { watchEvent } from "../../lib/utils/event";

let watchingPastEvents = false;

export const usePredictionViewModel = () => {
  const predictionStore = usePredictionStore()
  const {available, currentRound, intervalSeconds, pastRounds, bufferSeconds, pastAvailable} = predictionStore;
 	const { provider, active, address, signer} = useWalletViewModel();
  const {send} = useTransaction()
  const dispatch = useDispatch();
  
  const contract = Prediction__factory.connect( PREDICTION_ADDRESSES[process.env.REACT_APP_ENVIRONMENT as keyof typeof PREDICTION_ADDRESSES], signer ? signer : provider );
  const predict = useCallback((
    token: keyof typeof PREDICTION_TOKEN_ADDRESSES, 
    direction: DIRECTION, 
    send: (params:SendParams) => Promise<void>,
    callbacks?: {[key: string]: () => void}
  ) => 
    predictUsecase({ active, token, direction, send, contract, available, currentRound: currentRound.epoch, callbacks }), 
    [active, contract, available, currentRound]);
  
  const getPastRounds = useCallback(() => getPastRoundsAction( 
    contract, address, active )(dispatch), 
    [dispatch, contract, address, active]
  );
  const getUserRound = useCallback((round) => getPastUserRoundAction(
    contract, round, address, active)(dispatch), 
    [active, address, contract, dispatch]
  );
  const getUserRounds = (epochs: BigNumber[]) => {
    epochs.forEach(epoch => getUserRound(pastRounds[epoch.toString()]))
  }

  const initPrediction = useCallback(() => initPredictionAction( contract, address, active )(dispatch), [dispatch, contract, address, active]);
  
  let nos = Object.keys(pastRounds);
  let userPredictionData: (PredictionUserDataModel | boolean)[] = nos.map(no => {
    const round = pastRounds[no];
    if(!round.user) return false;

    const myPrediction= round.user.position;
    const coinPredicted = getPredictionTokenName(round.user?.token) as keyof typeof TokenImages;
    const index = round._tokens.indexOf(round.user?.token);
    const lockedPrice = round.lockedPrices[index];
    const closingPrice = round.closePrices[index];                                                                                                                                                                                                
    const bears = toNumberLib(round.bears[index]).div(round.bets[index].toString()).times(100)
      .toFixed(0, 0);
    const bulls = toNumberLib(round.bulls[index]).div(round.bets[index].toString()).times(100)
      .toFixed(0, 0);

    let status;
    if(((lockedPrice.gt(closingPrice) && myPrediction === Position.BEAR)
      || (closingPrice.gt(lockedPrice) && myPrediction === Position.BULL))
      && round.oraclesCalled
    ){
      status = Status.WON;
    }else if(!round.oraclesCalled && round.lockedTimestamp.add(bufferSeconds).add(intervalSeconds).add(60).gte(Math.trunc(Date.now()/1000))) {
      // additional 60 seconds acounts for blockchain time
      status = Status.PENDING
    }else if(!round.oraclesCalled){
      status = Status.UNSUCCESSFUL;
    }else {
      status = Status.LOST
    }

    return {
      myPrediction,
      coinPredicted,
      coinPredictedIcon: coinPredicted ? TokenImages[coinPredicted] : "",
      lockedPrice: lockedPrice.toString(),
      closingPrice: closingPrice.toString(),
      status,
      round: round.epoch.toString(),
      statistics: [bulls, bears],
      claimed: round.user.claimed
    }
  });

  let _userPredictionData = (userPredictionData?.filter(data => data !== false)) as unknown as PredictionUserDataModel[];
  _userPredictionData.sort((a, b) => {
    return a.round > b.round ? -1 : 1; 
  })
 
  const poolsEntered = _userPredictionData.length;
  const roundsWon = _userPredictionData.filter(round => round.status === Status.WON).length;
  const roundsLost = _userPredictionData.filter(round => round.status === Status.LOST).length;
  const unsuccessful = _userPredictionData.filter(round => round.status === Status.UNSUCCESSFUL ).length;
  const unsuccessfulTokens = _userPredictionData.filter(round => round.status === Status.UNSUCCESSFUL && !round.claimed)
      .reduce((oldRound, newRound) => {
        return pastRounds[newRound.round].user?.amount.add(oldRound) || oldRound;
      }, BigNumber.from(0));
  const _unsuccessfulTokens = displayTokenValue(unsuccessfulTokens.toString(), 18, 5)
  const overview = {
    poolsEntered, roundsLost, roundsWon, 
    unsuccessful, unsuccessfulTokens: _unsuccessfulTokens
  };
  const unsuccessfulRounds = _userPredictionData.filter(
    round => round.status === Status.UNSUCCESSFUL && !round.claimed
    ).map(round => round.round)

  const withdraw = useCallback((
    callbacks?: {[key: string]: () => void}) => withdrawUsecase({contract, send, callbacks, epochs: unsuccessfulRounds}), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contract, send]
  );

  useEffect(() => {
    if(!watchingPastEvents && pastAvailable){
      watchEvent(contract, "Claim", [address], (address, epochs, amount) => {
        getUserRounds(epochs);
      })
      watchingPastEvents = true;
    }

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return{
    ...predictionStore,
    initPrediction,
    getPastRounds,
    predict,
    withdraw, 
    userPredictionData:  _userPredictionData,
    overview
  }
}
