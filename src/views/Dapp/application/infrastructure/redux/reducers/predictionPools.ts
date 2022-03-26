import { PredictionPoolStore } from "../../../domain/predictionPools/predictionPoolsStore";
import * as actionType from "../actionTypes/predictionPools";

const initial: Pick<PredictionPoolStore, "available" | "isLoading" | "pools" | "pastPools" | "isLoadingPastPools"> & {currentPool: number}  = {
  available: false,
  isLoading: false,
  isLoadingPastPools: false,
  pools: {},
  currentPool: 0,
  pastPools: []
}

export const loserPoolReducer = (state = initial, action: {type: string, data?: any}) => {
   switch(action.type){
    case(actionType.GET_PAST_LOSER_POOLS):
      return {...state, isLoadingPastPools: true}
    case(actionType.GET_PAST_LOSER_POOLS_FAILED):
      return {...state, isLoadingPastPools: false}
    case(actionType.GET_PAST_LOSER_POOLS_SUCCESS):
      return {...state, isLoadingPastPools: false, pastAvailable: true}
    case(actionType.SET_LOSER_POOL):
    case(actionType.SET_USER_LOSER_POOL_DETAILS):
      return {...state, pools:{...state.pools, [action.data.pool.pId] : action.data.pool, }, pastPools: [...state.pastPools, action.data.pool.pId]}
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
    case(actionType.GET_PAST_WINNER_POOLS):
      return {...state, isLoadingPastPools: true}
    case(actionType.GET_PAST_WINNER_POOLS_FAILED):
      return {...state, isLoadingPastPools: false}
    case(actionType.GET_PAST_WINNER_POOLS_SUCCESS):
      return {...state, isLoadingPastPools: false, pastAvailable: true}
    case(actionType.SET_WINNER_POOL):
    case(actionType.SET_USER_WINNER_POOL_DETAILS):
      return {...state, pools:{...state.pools, [action.data.pool.pId] : action.data.pool, },  pastPools: [...state.pastPools, action.data.pool.pId]}
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
