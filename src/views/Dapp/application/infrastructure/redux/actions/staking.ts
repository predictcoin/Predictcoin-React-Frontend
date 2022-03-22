import { Dispatch } from "react";
import * as actionTypes from "../actionTypes/staking";
import { Staking } from "../../../../typechain";
import { initStaking as initStakingUsecase, initFarming as initFarmingUsecase } from "../../../usecases/staking/init";
import { getFarmPool as getFarmPoolUsecase,
  getStakePool as getStakePoolUsecase,
  getUserPoolDetails as getUserPoolDetailsUsecase } from "../../../usecases/staking/getPool";
import { Pool } from "../../../domain/staking/entity";


export const initStaking = (contract: Staking, address: string, active: boolean) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.INIT_STAKING
  })
  try{
    const initState = await initStakingUsecase({contract, userAddress: address});
    dispatch({
      type: actionTypes.INIT_STAKING_SUCCESS,
      data:{
        ...initState
      }
    })
  }catch(err){
    console.log(err);
    dispatch({
      type: actionTypes.INIT_STAKING_FAILED,
    })
  }
}

export const initFarming = (contract: Staking, address: string, active: boolean) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.INIT_FARMING
  })
  try{
    const initState = await initFarmingUsecase({contract, userAddress: address});
    dispatch({
      type: actionTypes.INIT_FARMING_SUCCESS,
      data:{
        ...initState
      }
    })
  }catch(err){
    console.log(err);
    dispatch({
      type: actionTypes.INIT_FARMING_FAILED,
    })
  }
}

export const getUserPoolDetails = (contract: Staking, address: string, pool: Pool, ) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  const _pool = await getUserPoolDetailsUsecase({contract, pool, userAddress:address})
  dispatch({
    type: actionTypes.SET_POOL,
    data:{
      pool: _pool
    }
  })
}

export const getFarmPool = (contract: Staking, address: string, pId: number) => async (dispatch: Dispatch<{type: string, data?: any}>) => {
  const _pool = await getFarmPoolUsecase({contract, pId, userAddress: address, })
  console.log(_pool);
  dispatch({
    type: actionTypes.SET_POOL,
    data:{
      pool: _pool
    }
  })
}

export const getStakePool = (contract: Staking, address: string, pId: number) => async (dispatch: Dispatch<{type: string, data?: any}>) => {
  const _pool = await getFarmPoolUsecase({contract, pId, userAddress: address, })
  console.log(_pool);
  dispatch({
    type: actionTypes.SET_POOL,
    data:{
      pool: _pool
    }
  })
}
