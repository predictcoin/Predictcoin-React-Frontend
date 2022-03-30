import { Dispatch } from "react"
import * as actionTypes from "../actionTypes/prediction";
import { getRounds as getRoundsUsecase } from "../../../usecases/prediction/getRounds";
import { 
  getUserRound as getUserRoundUsecase} from "../../../usecases/prediction/getUserRounds";
import { initPrediction as initPredictionUsecase } from "../../../usecases/prediction/initPrediction";
import { Prediction } from "../../../../typechain";
import { Round } from "../../../domain/prediction/entity";


export const getRounds = (contract: Prediction, address: string, active: boolean) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.GET_ROUNDS,
  });
  const _dispatch = (data: any) => {
    dispatch({
      type: actionTypes.SET_ROUND,
      data
    })
  }
  try{
    await getRoundsUsecase({ contract, address, active, dispatch: _dispatch });
    dispatch({
      type: actionTypes.GET_ROUNDS_SUCCESS,
    })
  }catch(err){  
    dispatch({
      type: actionTypes.GET_ROUNDS_FAILED
    })
  }
}

export const getUserRound = (contract: Prediction, round: Round, address: string, active: boolean) => async(dispatch: Dispatch<{type: string, data?: any}>) => {
  const userRound = await getUserRoundUsecase({contract, round, address});
  dispatch({
    type: actionTypes.SET_ROUND,
    data: {
      round: userRound
    }
  })
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
