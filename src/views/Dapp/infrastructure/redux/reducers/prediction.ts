import { PredictionStore } from "../../../application/domain/prediction/predictionStore";
import * as actionType from "../actionTypes/prediction";

const initialState = {
  isLoadingCurrent: false,
  isLoadingPast: false,
  available: false,
}

export const predictionReducer = (state = initialState, action: {type: string, data?: any}): any => {
  switch(action.type){
    case(actionType.GET_PAST_ROUNDS): 
      return {...state, isLoadingPast: true}
    case(actionType.GET_PAST_ROUNDS_FAILED):
      return {...state, isLoadingPast: false}
    case(actionType.GET_PAST_ROUNDS_SUCCESS):
      return {...state, isLoadingPast: false, pastAvailable: true, ...action.data}
    case(actionType.GET_PREDICTION):
      return {...state, isLoadingCurrent: true, available: true}
    case(actionType.GET_PREDICTION_FAILED):
      return {...state, isLoadingCurrent: false}
    case(actionType.GET_PREDICTION_SUCCESS):
      return {...state, isLoadingCurrent: false, ...action.data}
    case(actionType.SET_PREDICTION):
      return {...state, available: true, ...action.data}
    default:
      return state
  }
}