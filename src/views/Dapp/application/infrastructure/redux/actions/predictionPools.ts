import { Dispatch } from "react";
import { LoserPrediction, Prediction, WinnerPrediction } from "../../../../typechain";
import * as actionTypes from "../actionTypes/predictionPools";
import { initLoserPool as initLoserPoolUsecase, initWinnerPool as initWinnerPoolUsecase} from "../../../usecases/predictionPools/init";
import { getPastLoserPools as getPastLoserPoolsAction, getPastWinnerPools as getPastWinnerPoolsAction } from "../../../usecases/predictionPools/getPastPools";
import { getLoserPool as getLoserPoolAction,
  getWinnerPool as getWinnerPoolAction } from "../../../usecases/predictionPools/getPool";
import { PredictionPool } from "../../../domain/predictionPools/entity";
import { LoserPoolStore, WinnerPoolStore } from "../../../domain/predictionPools/predictionPoolsStore";

export const initLoserPool = (contract: LoserPrediction, address: string, active: boolean) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.INIT_LOSER_POOL
  })
  try{
    const initState = await initLoserPoolUsecase({contract, userAddress: address});
    dispatch({
      type: actionTypes.INIT_LOSER_POOL_SUCCESS,
      data:{
        ...initState
      }
    })
  }catch(err){
    console.log(err);
    dispatch({
      type: actionTypes.INIT_LOSER_POOL_FAILED,
    })
  }
}

export const initWinnerPool = (contract: WinnerPrediction, address: string, active: boolean) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.INIT_WINNER_POOL
  })
  try{
    const initState = await initWinnerPoolUsecase({contract, userAddress: address});
    dispatch({
      type: actionTypes.INIT_WINNER_POOL_SUCCESS,
      data:{
        ...initState
      }
    })
  }catch(err){
    console.log(err);
    dispatch({
      type: actionTypes.INIT_WINNER_POOL_FAILED,
    })
  }
}

export const getPastLoserPools = (contract: LoserPrediction, address: string, active: boolean) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.GET_PAST_LOSER_POOLS
  })

  const _dispatch = (data: any) => {
    dispatch({
      type: actionTypes.SET_LOSER_POOL,
      data
    })
  }

  try{
    await getPastLoserPoolsAction({contract, userAddress: address, dispatch: _dispatch});
    dispatch({
      type: actionTypes.GET_PAST_LOSER_POOLS_SUCCESS
    })
  }catch{
    dispatch({
      type: actionTypes.GET_PAST_LOSER_POOLS_FAILED
    })
  }
}

export const getPastWinnerPools = (contract: WinnerPrediction, address: string, active: boolean) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  dispatch({
    type: actionTypes.GET_PAST_WINNER_POOLS
  })
  const _dispatch = (data: any) => {
    dispatch({
      type: actionTypes.SET_WINNER_POOL,
      data
    })
  }
  
  try{
    await getPastWinnerPoolsAction({contract, userAddress: address, dispatch: _dispatch});
    dispatch({
      type: actionTypes.GET_PAST_WINNER_POOLS_SUCCESS,
    })
  }catch{
    dispatch({
      type: actionTypes.GET_PAST_WINNER_POOLS_FAILED,
    })
  }
  
}

export const getLoserPool = async (contract: LoserPrediction,
   pId: string, address: string,  store: LoserPoolStore, 
   pool?: PredictionPool,) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  const _pool = await getLoserPoolAction({contract, pId, pool, address, store});
  dispatch({
    type: actionTypes.SET_LOSER_POOL,
    data: {
      pool: _pool
    }
  })
}

export const getWinnerPool = async (contract: WinnerPrediction,
   pId: string, address: string,  store: WinnerPoolStore, 
   pool?: PredictionPool,) => async (dispatch: Dispatch<{type:string, data?: any}>) => {
  const _pool = await getWinnerPoolAction({contract, pId, pool, address, store});
  dispatch({
    type: actionTypes.SET_WINNER_POOL,
    data: {
      pool: _pool
    }
  })
}