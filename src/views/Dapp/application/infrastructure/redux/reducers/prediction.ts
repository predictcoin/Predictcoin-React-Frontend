import * as actionType from "../actionTypes/prediction";
import { PREDICTION_ADDRESSES } from "../../../../constants/addresses";
import { PredictionStore } from "../../../domain/prediction/predictionStore";
import { BigNumber } from "ethers";


const initialState: Pick<PredictionStore, "isLoadingCurrent" | "isLoadingPast"
  | "available" | "address" | "pastRounds" |"bufferSeconds"
  > = {
  isLoadingCurrent: false,
  isLoadingPast: false,
  available: false,
  address: PREDICTION_ADDRESSES[process.env.REACT_APP_ENVIRONMENT as keyof typeof PREDICTION_ADDRESSES],
  pastRounds: {},
  bufferSeconds: BigNumber.from(0)
}

export const predictionReducer = (state = initialState, action: {type: string, data?: any}): any => {
  switch(action.type){
    case(actionType.GET_PAST_ROUNDS): 
      return {...state, isLoadingPast: true}
    case(actionType.SET_PAST_ROUND):
      if (
          state.pastRounds[Object.keys(action.data.round)[0]]?.user && 
          !action.data[Object.keys(action.data.round)[0]]?.user 
        ) { return {...state, isLoadingPast: true, }};
      return {...state, pastRounds: {...state.pastRounds, ...action.data.round} , 
        bufferSeconds: action.data.bufferSeconds || state.bufferSeconds }
    case(actionType.GET_PAST_ROUNDS_FAILED):
      return {...state, isLoadingPast: false}
    case(actionType.GET_PAST_ROUNDS_SUCCESS):
      return {...state, isLoadingPast: false, pastAvailable: true}
    case(actionType.INIT_PREDICTION):
      return {...state, isLoadingCurrent: true}
    case(actionType.INIT_PREDICTION_FAILED):
      return {...state, isLoadingCurrent: false}
    case(actionType.INIT_PREDICTION_SUCCESS):
      if(Object.keys(state.pastRounds).length > 0 && 
        Object.keys(action.data.pastRounds).length === 0 && state.available) return state;
      return {...state, available: true, isLoadingCurrent: false, ...action.data}
    // case(actionType.SET_PREDICTION):
    //   return {...state, available: true, ...action.data}
    default:
      return state
  }
}
