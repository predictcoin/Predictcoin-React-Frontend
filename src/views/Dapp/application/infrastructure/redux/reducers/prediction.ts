import * as actionType from "../actionTypes/prediction";
import { PREDICTION_ADDRESSES } from "../../../../constants/addresses";

const initialState = {
  isLoadingCurrent: false,
  isLoadingPast: false,
  available: false,
  address: PREDICTION_ADDRESSES[process.env.REACT_APP_ENVIRONMENT as keyof typeof PREDICTION_ADDRESSES],
}

export const predictionReducer = (state = initialState, action: {type: string, data?: any}): any => {
  switch(action.type){
    case(actionType.GET_PAST_ROUNDS): 
      return {...state, isLoadingPast: true}
    case(actionType.GET_PAST_ROUNDS_FAILED):
      return {...state, isLoadingPast: false}
    case(actionType.GET_PAST_ROUNDS_SUCCESS):
      return {...state, isLoadingPast: false, pastAvailable: true, ...action.data}
    case(actionType.INIT_PREDICTION):
      return {...state, isLoadingCurrent: true}
    case(actionType.INIT_PREDICTION_FAILED):
      return {...state, isLoadingCurrent: false}
    case(actionType.INIT_PREDICTION_SUCCESS):
      return {...state, available: true, isLoadingCurrent: false, ...action.data}
    // case(actionType.SET_PREDICTION):
    //   return {...state, available: true, ...action.data}
    default:
      return state
  }
}