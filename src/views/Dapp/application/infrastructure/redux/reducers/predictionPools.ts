import { PredictionPoolStore } from "../../../domain/predictionPools/predictionPoolsStore";
import * as actionType from "../actionTypes/predictionPools";

const initial: Pick<PredictionPoolStore, "available" | "isLoading" | "pools"> & {currentPool: number}  = {
  available: false,
  isLoading: false,
  pools: {},
  currentPool: 0
}

export const loserPoolReducer = (state = initial, action: {type: string, data?: any}) => {
   switch(action.type){
    case(actionType.SET_LOSER_POOL):
    case(actionType.SET_USER_LOSER_POOL_DETAILS):
      return {...state, pools:{...state.pools, [action.data.pool.pId] : action.data.pool}}
    case(actionType.INIT_LOSER_POOL):
      return {...state, isLoadingStaking: true}
    case(actionType.INIT_LOSER_POOL_FAILED):
      return {...state, isLoadingStaking: false}
    case(actionType.INIT_LOSER_POOL_SUCCESS):
      if(state.pools[state.currentPool]?.userStaked && !action.data?.pools[state.currentPool]?.userStaked){
        return {...state, stakingAvailable: true, isLoadingStaking: false, ...action.data, pools: {...state.pools}}
      }
      return {...state, stakingAvailable: true, isLoadingStaking: false, ...action.data, pools: {...state.pools, ...action.data?.pools}}
    default:
      return state
  }
}

export const winnerPoolReducer = (state = initial, action: {type: string, data?: any}) => {
   switch(action.type){
    case(actionType.SET_WINNER_POOL):
    case(actionType.SET_USER_WINNER_POOL_DETAILS):
      return {...state, pools:{...state.pools, [action.data.pool.pId] : action.data.pool}}
    case(actionType.INIT_WINNER_POOL):
      return {...state, isLoadingStaking: true}
    case(actionType.INIT_WINNER_POOL_FAILED):
      return {...state, isLoadingStaking: false}
    case(actionType.INIT_WINNER_POOL_SUCCESS):
      if(state.pools[state.currentPool]?.userStaked && !action.data?.pools[state.currentPool]?.userStaked){
        return {...state, stakingAvailable: true, isLoadingStaking: false, ...action.data, pools: {...state.pools}}
      }
      return {...state, stakingAvailable: true, isLoadingStaking: false, ...action.data, pools: {...state.pools, ...action.data?.pools}}
    default:
      return state
  }
}
