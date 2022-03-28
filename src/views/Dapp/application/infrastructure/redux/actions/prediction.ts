import { Dispatch } from "react"
import * as actionTypes from "../actionTypes/prediction";
import { getPastRounds as getPastRoundsUsecase } from "../../../usecases/prediction/getPastRounds";
import { 
  getPastUserRound as getPastUserRoundUsecase} from "../../../usecases/prediction/getPastUserRounds";
import { initPrediction as initPredictionUsecase } from "../../../usecases/prediction/initPrediction";
import { Prediction } from "../../../../typechain";
import { Round } from "../../../domain/prediction/entity";


export const getPastRounds = (contract: Prediction, address: string, active: boolean) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.GET_PAST_ROUNDS,
  });
  const _dispatch = (data: any) => {
    dispatch({
      type: actionTypes.SET_PAST_ROUND,
      data
    })
  }
  try{
    await getPastRoundsUsecase({ contract, address, active, dispatch: _dispatch });
    dispatch({
      type: actionTypes.GET_PAST_ROUNDS_SUCCESS,
    })
  }catch(err){  
    dispatch({
      type: actionTypes.GET_PAST_ROUNDS_FAILED
    })
  }
}

export const getPastUserRound = (contract: Prediction, round: Round, address: string, active: boolean) => async(dispatch: Dispatch<{type: string, data?: any}>) => {
  const userRound = await getPastUserRoundUsecase({contract, round, address});
  
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
        ...initState
      }
    })
  }catch(err){
    console.log(err);
    dispatch({
      type: actionTypes.INIT_PREDICTION_FAILED,
    })
  }
};

// export const predict = (direction: DIRECTION, token: keyof typeof PREDICTION_TOKEN_ADDRESSES) => async() => {
//   predictUsecase({direction, token})
// }
