import { StakingStore } from "../../../domain/staking/stakingStore";
import * as actionType from "../actionTypes/staking";
import { stakingPools, farmingPools } from "../../../domain/staking/stakingStore";

const initial: Pick<StakingStore, "farmingAvailable" | "stakingAvailable" | "isLoadingStaking" | "isLoadingFarming" | "pools">  = {
  farmingAvailable: false,
  stakingAvailable: false,
  isLoadingStaking: false,
  isLoadingFarming: false,
  pools: {}
}

export const stakingReducer = (state = initial, action: {type: string, data?: any}) => {
   switch(action.type){
    case(actionType.SET_POOL):
    case(actionType.SET_USER_POOL_DETAILS):
      return {...state, pools:{...state.pools, [action.data.pool.pId] : action.data.pool}}
    case(actionType.INIT_STAKING):
      return {...state, isLoadingStaking: true}
    case(actionType.INIT_STAKING_FAILED):
      return {...state, isLoadingStaking: false}
    case(actionType.INIT_STAKING_SUCCESS):
      if(state.pools[stakingPools[0]]?.userStaked && !action.data?.pools[stakingPools[0]]?.userStaked){
        return {...state, stakingAvailable: true, isLoadingStaking: false, ...action.data, pools: {...state.pools}}
      }
      return {...state, stakingAvailable: true, isLoadingStaking: false, ...action.data, pools: {...state.pools, ...action.data?.pools}}
    case(actionType.INIT_FARMING):
      return {...state, isLoadingFarming: true}
    case(actionType.INIT_FARMING_FAILED):
      return {...state, isLoadingFarming: false}
    case(actionType.INIT_FARMING_SUCCESS):
      if(state.pools[farmingPools[0]]?.userStaked && !action.data?.pools[farmingPools[0]]?.userStaked){
        return {...state, farmingAvailable: true, isLoadingFarming: false, ...action.data, pools: {...state.pools}}
      }
      return {...state, farmingAvailable: true, isLoadingFarming: false, ...action.data, pools: {...state.pools, ...action.data?.pools}}
    default:
      return state
  }
}
