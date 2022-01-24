import { Dispatch } from "react"
import { BetInfo, Prediction, Round } from "../../../application/domain/prediction/entity";
import * as actionTypes from "../actionTypes/prediction";
import { getPastRounds as getPastRoundsUsecase } from "../../../application/usecases/prediction.ts/getPastRounds";
import { getPrediction as getPredictionUsecase } from "../../../application/usecases/prediction.ts/getPrediction";
import { getPastUserRounds } from "../../../application/usecases/prediction.ts/getPastUserRounds";
import { WalletStore } from "../../../application/domain/wallet/walletStore";
import { PredictionStore } from "../../../application/domain/prediction/predictionStore";

export const getPastRounds = (walletStore: WalletStore) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.GET_PAST_ROUNDS,
    data: {
      isLoadingPast: true
    }
  });
  let _pastRounds;
  try{
    const pastRounds = await getPastRoundsUsecase({ walletStore });
    if(walletStore.active){
      const [userRounds, betInfo] = await getPastUserRounds({ walletStore });
      const _userRounds = userRounds.map((round) => round.toString());
      _pastRounds = pastRounds.map(round =>{
        const index = _userRounds.indexOf(round.epoch.toString());
        if(index !== -1){
          round.user = betInfo[index] as unknown as BetInfo;
        }
        return round;
      })
    }

    dispatch({
      type: actionTypes.GET_PAST_ROUNDS_SUCCESS,
      data: {pastRounds: _pastRounds}
    })
  }catch(err){  
    dispatch({
      type: actionTypes.GET_PAST_ROUNDS_FAILED
    })
  }

  return _pastRounds;
}

export const getPrediction = (walletStore: WalletStore) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.GET_PREDICTION,
  })

  try{
    const prediction = await getPredictionUsecase({walletStore});
    dispatch({
      type: actionTypes.GET_PREDICTION,
      data:{
        isLoadingCurrent: true,
        prediction
      }
    })
  }catch(err){
    dispatch({
      type: actionTypes.GET_PREDICTION_FAILED,
    })
  }

};
