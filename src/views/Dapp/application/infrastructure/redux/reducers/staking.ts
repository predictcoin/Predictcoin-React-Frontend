import { StakingStore } from "../../../domain/staking/stakingStore";
import * as actionType from "../actionTypes/staking";

const initial: Pick<StakingStore, "available" | "isLoading" | "pools">  = {
  available: false,
  isLoading: false,
  pools: {}
}

export const stakingReducer = (state = initial, action: {type: string, data?: any}) => {
   switch(action.type){
    case(actionType.SET_POOL):
      return {...state, pools:{...state.pools, ...action.data?.pool}}
    case(actionType.INIT_STAKING):
      return {...state, isLoading: true}
    case(actionType.INIT_STAKING_FAILED):
      return {...state, isLoading: false}
    case(actionType.INIT_STAKING_SUCCESS):
      return {...state, available: true, isLoading: false, ...action.data}
    default:
      return state
  }
}

