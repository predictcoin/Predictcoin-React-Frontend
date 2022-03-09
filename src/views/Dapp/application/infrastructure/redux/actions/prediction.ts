import { Dispatch } from "react"
import * as actionTypes from "../actionTypes/prediction";
import { getPastRounds as getPastRoundsUsecase } from "../../../usecases/prediction.ts/getPastRounds";
import { initPrediction as initPredictionUsecase } from "../../../usecases/prediction.ts/initPrediction";
import { getPastUserRounds } from "../../../usecases/prediction.ts/getPastUserRounds";
import { Prediction } from "../../../../typechain";

export const getPastRounds = (contract: Prediction, address: string, active: boolean) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.GET_PAST_ROUNDS,
  });
  let _pastRounds;
  try{
    const pastRounds = await getPastRoundsUsecase({ contract });
    if(active){
      const [userRounds, betInfo] = await getPastUserRounds({ contract, address });
      const _userRounds = userRounds.map((round) => round.toString());
      _pastRounds = pastRounds.map(round =>{
        const index = _userRounds.indexOf(round.epoch.toString());
        if(index !== -1){
          round.user = betInfo[index];
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

export const initPrediction = ( contract: Prediction, address: string, active: boolean ) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.INIT_PREDICTION,
  })

  try{
    const initState = await initPredictionUsecase({active, address, contract});
    dispatch({
      type: actionTypes.INIT_PREDICTION_SUCCESS,
      data:{
        isLoadingCurrent: true,
        initState
      }
    })
  }catch(err){
    dispatch({
      type: actionTypes.INIT_PREDICTION_FAILED,
    })
  }
};
